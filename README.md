# Reel Club

A small movie collection manager for a local film club. The browser UI supports adding, browsing, searching, editing, sorting, and removing movies. Movie records are stored in MongoDB.

## Run locally

1. Install Node.js and start a local MongoDB server, or prepare a MongoDB connection URI.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env` and set `MONGODB_URI` if your MongoDB server is not at the default local address. The default database is `movieclub`.
4. Start the app with `npm start` (or `npm run dev` during development).
5. Open `http://localhost:3000`.

The server starts only after it connects to MongoDB. The `/api/health` endpoint reports the database connection state.

## API

- `GET /api/movies` — list all movies; pass `?q=...` to search title and genre.
- `POST /api/movies` — add a movie.
- `PUT /api/movies/:id` — update a movie.
- `DELETE /api/movies/:id` — remove a movie.

Movie fields: `title`, `genre`, `releaseYear`, `rating` (0–10), and `director`.
