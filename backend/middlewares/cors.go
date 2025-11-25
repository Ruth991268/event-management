// middlewares/cors.go
package middlewares

import "net/http"

func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Only ONE origin! Pick the one your frontend uses
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000") // Nuxt default
		// Or use this line instead if you're on Vite: "http://localhost:5173"

		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}