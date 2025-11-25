package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
	"time"
	"fmt"

	"event-management/backend/middlewares"
)

// ---------------------------
// Create Event
// ---------------------------
func CreateEvent(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value(middlewares.UserIDKey).(int64)

		var input struct {
			Title       string  `json:"title"`
			Description string  `json:"description"`
			Location    string  `json:"location"`
			Category    string  `json:"category"`
			StartDate   string  `json:"start_date"`
			EndDate     string  `json:"end_date"`
			Price       float64 `json:"price"`
		}

		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		start, err := time.Parse(time.RFC3339, input.StartDate)
		if err != nil {
			http.Error(w, "Invalid start_date format. Use RFC3339.", http.StatusBadRequest)
			return
		}
		end, err := time.Parse(time.RFC3339, input.EndDate)
		if err != nil {
			http.Error(w, "Invalid end_date format. Use RFC3339.", http.StatusBadRequest)
			return
		}

		var eventID int64
		err = db.QueryRow(`
			INSERT INTO events (title, description, category, location, start_date, end_date, price, created_by)
			VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
			RETURNING id
		`, input.Title, input.Description, input.Category, input.Location, start, end, input.Price, userID).Scan(&eventID)

		if err != nil {
			http.Error(w, "Failed to create event: "+err.Error(), http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(map[string]interface{}{
			"message":  "Event created successfully",
			"event_id": eventID,
		})
	})
}

// ---------------------------
// List Events
// ---------------------------
func ListEvents(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query(`SELECT id, title, description, category, location, start_date, end_date, price, created_by FROM events ORDER BY id DESC`)
		if err != nil {
			http.Error(w, "Failed to fetch events", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		events := []map[string]interface{}{}
		for rows.Next() {
			var id, createdBy int64
			var title, desc, category, location string
			var start, end time.Time
			var price float64

			if err := rows.Scan(&id, &title, &desc, &category, &location, &start, &end, &price, &createdBy); err != nil {
				continue
			}

			events = append(events, map[string]interface{}{
				"id":          id,
				"title":       title,
				"description": desc,
				"category":    category,
				"location":    location,
				"start_date":  start,
				"end_date":    end,
				"price":       price,
				"created_by":  createdBy,
			})
		}

		json.NewEncoder(w).Encode(events)
	})
}

// ---------------------------
// Get Single Event
// ---------------------------
func GetEvent(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		idStr := r.URL.Query().Get("id")
		id, err := strconv.ParseInt(idStr, 10, 64)
		if err != nil {
			http.Error(w, "Invalid event id", http.StatusBadRequest)
			return
		}

		var (
			title, desc, category, location string
			start, end                     time.Time
			price                           float64
			createdBy                       int64
		)

		err = db.QueryRow(`
			SELECT title, description, category, location, start_date, end_date, price, created_by
			FROM events WHERE id=$1
		`, id).Scan(&title, &desc, &category, &location, &start, &end, &price, &createdBy)

		if err == sql.ErrNoRows {
			http.Error(w, "Event not found", http.StatusNotFound)
			return
		}
		if err != nil {
			http.Error(w, "Error fetching event", http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(map[string]interface{}{
			"id":          id,
			"title":       title,
			"description": desc,
			"category":    category,
			"location":    location,
			"start_date":  start,
			"end_date":    end,
			"price":       price,
			"created_by":  createdBy,
		})
	})
}

// ---------------------------
// Update Event
// ---------------------------
// handlers/events.go → Replace the entire UpdateEvent function with this:
func UpdateEvent(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPut {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		userID := r.Context().Value(middlewares.UserIDKey).(int64)
		idStr := r.URL.Query().Get("id")
		eventID, err := strconv.ParseInt(idStr, 10, 64)
		if err != nil {
			http.Error(w, "Invalid event id", http.StatusBadRequest)
			return
		}

		var input struct {
			Title       *string  `json:"title"`
			Description *string  `json:"description"`
			Location    *string  `json:"location"`
			Category    *string  `json:"category"`
			StartDate   *string  `json:"start_date"`
			EndDate     *string  `json:"end_date"`
			Price       *float64 `json:"price"`
		}

		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		// Build dynamic query
		query := "UPDATE events SET updated_at = NOW()"
		var args []interface{}
		argID := 1

		if input.Title != nil {
			query += fmt.Sprintf(", title = $%d", argID)
			args = append(args, *input.Title)
			argID++
		}
		if input.Description != nil {
			query += fmt.Sprintf(", description = $%d", argID)
			args = append(args, *input.Description)
			argID++
		}
		if input.Location != nil {
			query += fmt.Sprintf(", location = $%d", argID)
			args = append(args, *input.Location)
			argID++
		}
		if input.Category != nil {
			query += fmt.Sprintf(", category = $%d", argID)
			args = append(args, *input.Category)
			argID++
		}
		if input.Price != nil {
			query += fmt.Sprintf(", price = $%d", argID)
			args = append(args, *input.Price)
			argID++
		}
		if input.StartDate != nil {
			start, err := time.Parse(time.RFC3339, *input.StartDate)
			if err != nil {
				http.Error(w, "Invalid start_date format. Use RFC3339", http.StatusBadRequest)
				return
			}
			query += fmt.Sprintf(", start_date = $%d", argID)
			args = append(args, start)
			argID++
		}
		if input.EndDate != nil {
			end, err := time.Parse(time.RFC3339, *input.EndDate)
			if err != nil {
				http.Error(w, "Invalid end_date format. Use RFC3339", http.StatusBadRequest)
				return
			}
			query += fmt.Sprintf(", end_date = $%d", argID)
			args = append(args, end)
			argID++
		}

		if argID == 1 {
			http.Error(w, "No fields to update", http.StatusBadRequest)
			return
		}

		query += fmt.Sprintf(" WHERE id = $%d AND created_by = $%d", argID, argID+1)
		args = append(args, eventID, userID)

		result, err := db.Exec(query, args...)
		if err != nil {
			http.Error(w, "Update failed: "+err.Error(), http.StatusInternalServerError)
			return
		}

		rows, _ := result.RowsAffected()
		if rows == 0 {
			http.Error(w, "Event not found or not owned by you", http.StatusNotFound)
			return
		}

		json.NewEncoder(w).Encode(map[string]string{"message": "Event updated successfully"})
	})
}
// ---------------------------
// Delete Event
// ---------------------------
func DeleteEvent(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodDelete {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		userID := r.Context().Value(middlewares.UserIDKey).(int64)
		idStr := r.URL.Query().Get("id")
		eventID, err := strconv.ParseInt(idStr, 10, 64)
		if err != nil {
			http.Error(w, "Invalid event id", http.StatusBadRequest)
			return
		}

		_, err = db.Exec(`DELETE FROM events WHERE id=$1 AND created_by=$2`, eventID, userID)
		if err != nil {
			http.Error(w, "Delete failed", http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(map[string]string{"message": "Event deleted successfully"})
	})
}

// ---------------------------
// Follow / Unfollow / Bookmark / Unbookmark
// ---------------------------
func FollowEvent(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value(middlewares.UserIDKey).(int64)
		eventID, _ := strconv.ParseInt(r.URL.Query().Get("event_id"), 10, 64)

		_, err := db.Exec(`INSERT INTO event_follows(user_id,event_id) VALUES($1,$2) ON CONFLICT DO NOTHING`, userID, eventID)
		if err != nil {
			http.Error(w, "Failed to follow", http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(map[string]string{"message": "Event followed"})
	})
}

func UnfollowEvent(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value(middlewares.UserIDKey).(int64)
		eventID, _ := strconv.ParseInt(r.URL.Query().Get("event_id"), 10, 64)

		_, err := db.Exec(`DELETE FROM event_follows WHERE user_id=$1 AND event_id=$2`, userID, eventID)
		if err != nil {
			http.Error(w, "Failed to unfollow", http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(map[string]string{"message": "Event unfollowed"})
	})
}

func BookmarkEvent(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value(middlewares.UserIDKey).(int64)
		eventID, _ := strconv.ParseInt(r.URL.Query().Get("event_id"), 10, 64)

		_, err := db.Exec(`INSERT INTO event_bookmarks(user_id,event_id) VALUES($1,$2) ON CONFLICT DO NOTHING`, userID, eventID)
		if err != nil {
			http.Error(w, "Failed to bookmark", http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(map[string]string{"message": "Event bookmarked"})
	})
}

func UnbookmarkEvent(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value(middlewares.UserIDKey).(int64)
		eventID, _ := strconv.ParseInt(r.URL.Query().Get("event_id"), 10, 64)

		_, err := db.Exec(`DELETE FROM event_bookmarks WHERE user_id=$1 AND event_id=$2`, userID, eventID)
		if err != nil {
			http.Error(w, "Failed to unbookmark", http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(map[string]string{"message": "Event unbookmarked"})
	})
}

// ---------------------------
// List Followed / Bookmarked
// ---------------------------
func ListFollowedEvents(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value(middlewares.UserIDKey).(int64)

		rows, err := db.Query(`
			SELECT e.id, e.title, e.description, e.category, e.location, e.start_date, e.end_date, e.price
			FROM event_follows f
			JOIN events e ON f.event_id = e.id
			WHERE f.user_id=$1
		`, userID)
		if err != nil {
			http.Error(w, "Failed to fetch followed events", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		events := []map[string]interface{}{}
		for rows.Next() {
			var id int64
			var title, desc, category, location string
			var start, end time.Time
			var price float64

			rows.Scan(&id, &title, &desc, &category, &location, &start, &end, &price)
			events = append(events, map[string]interface{}{
				"id":          id,
				"title":       title,
				"description": desc,
				"category":    category,
				"location":    location,
				"start_date":  start,
				"end_date":    end,
				"price":       price,
			})
		}
		json.NewEncoder(w).Encode(events)
	})
}

func ListBookmarkedEvents(db *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value(middlewares.UserIDKey).(int64)

		rows, err := db.Query(`
			SELECT e.id, e.title, e.description, e.category, e.location, e.start_date, e.end_date, e.price
			FROM event_bookmarks b
			JOIN events e ON b.event_id = e.id
			WHERE b.user_id=$1
		`, userID)
		if err != nil {
			http.Error(w, "Failed to fetch bookmarked events", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		events := []map[string]interface{}{}
		for rows.Next() {
			var id int64
			var title, desc, category, location string
			var start, end time.Time
			var price float64

			rows.Scan(&id, &title, &desc, &category, &location, &start, &end, &price)
			events = append(events, map[string]interface{}{
				"id":          id,
				"title":       title,
				"description": desc,
				"category":    category,
				"location":    location,
				"start_date":  start,
				"end_date":    end,
				"price":       price,
			})
		}
		json.NewEncoder(w).Encode(events)
	})
}
