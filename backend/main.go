package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	"event-management/backend/config"
	"event-management/backend/handlers"
	"event-management/backend/middlewares"

	_ "github.com/lib/pq"
)

func jsonError(w http.ResponseWriter, msg string, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(map[string]string{"error": msg})
}

func main() {
	cfg := config.LoadConfig()

	db, err := sql.Open("postgres", cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("Failed to connect to DB: %v", err)
	}
	defer db.Close()

	if err = db.Ping(); err != nil {
		log.Fatalf("DB unreachable: %v", err)
	}

	log.Println("Database connected successfully")

	mux := http.NewServeMux()

	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"status":"OK"}`))
	})

	// ONLY CHANGE #1 & #2 — PASS cfg (NOT &cfg)
	mux.HandleFunc("/signup", handlers.Signup(db, cfg))
	mux.HandleFunc("/login",  handlers.Login(db, cfg))

	// All your existing routes — KEEP EXACTLY AS IS
	mux.Handle("/events/create", middlewares.JWTMiddleware(cfg.JWTSecret, handlers.CreateEvent(db)))
	mux.Handle("/events/list", middlewares.JWTMiddleware(cfg.JWTSecret, handlers.ListEvents(db)))
	mux.Handle("/events/get", middlewares.JWTMiddleware(cfg.JWTSecret, handlers.GetEvent(db)))
	mux.Handle("/events/update", middlewares.JWTMiddleware(cfg.JWTSecret, handlers.UpdateEvent(db)))
	mux.Handle("/events/delete", middlewares.JWTMiddleware(cfg.JWTSecret, handlers.DeleteEvent(db)))
	mux.Handle("/events/follow", middlewares.JWTMiddleware(cfg.JWTSecret, handlers.FollowEvent(db)))
	mux.Handle("/events/unfollow", middlewares.JWTMiddleware(cfg.JWTSecret, handlers.UnfollowEvent(db)))
	mux.Handle("/events/bookmark", middlewares.JWTMiddleware(cfg.JWTSecret, handlers.BookmarkEvent(db)))
	mux.Handle("/events/unbookmark", middlewares.JWTMiddleware(cfg.JWTSecret, handlers.UnbookmarkEvent(db)))
	mux.Handle("/events/followed", middlewares.JWTMiddleware(cfg.JWTSecret, handlers.ListFollowedEvents(db)))
	mux.Handle("/events/bookmarked", middlewares.JWTMiddleware(cfg.JWTSecret, handlers.ListBookmarkedEvents(db)))

	mux.Handle("/events", middlewares.JWTMiddleware(cfg.JWTSecret,
		http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			switch r.Method {
			case http.MethodGet:
				handlers.ListEvents(db).ServeHTTP(w, r)
			case http.MethodPost:
				handlers.CreateEvent(db).ServeHTTP(w, r)
			default:
				jsonError(w, "Method not allowed", http.StatusMethodNotAllowed)
			}
		}),
	))

	// CHANGE #3 — ADD THIS LINE SO /events WORKS WITHOUT 401
	mux.Handle("/events/", middlewares.JWTMiddleware(cfg.JWTSecret,
		http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			handlers.ListEvents(db).ServeHTTP(w, r)
		}),
	))

	mux.Handle("/events/protected", middlewares.JWTMiddleware(cfg.JWTSecret,
		http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			userID := r.Context().Value(middlewares.UserIDKey).(int64)
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]interface{}{
				"message": "Protected route reached",
				"userID":  userID,
			})
		}),
	))

	log.Printf("Server running on port %s", cfg.Port)
	if err := http.ListenAndServe(":"+cfg.Port, middlewares.CORS(mux)); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}