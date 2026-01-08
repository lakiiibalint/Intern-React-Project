import { MOVIES } from "../data/movies";
import type { Movie } from "../models/Movie";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { SortUp, SortDown } from "react-bootstrap-icons";
import Button from "../components/Button";

export default function Movies() {
  //filmek
  const [movies, setMovies] = useState<Movie[]>(MOVIES);

  //szerkesztes
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  //rendezes
  const [sortBy, setSortBy] = useState<"rating" | "title" | "year">("rating");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  function handleDelete(id: number) {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  }

  function handleSave() {
    if (editingId === null) return;

    const newTitle = editingTitle.trim();
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === editingId ? { ...movie, title: newTitle } : movie
      )
    );

    setEditingId(null);
    setEditingTitle("");
  }

  //slice() a másolatra, hogy ne nyuljak bele a statebe
  //ha negativ számot ad vissza → a elorébb kerul, mint b
  const sortedMovies = movies.slice().sort((a, b) => {
    let result = 0;
    if (sortBy === "rating") {
      result = a.rating - b.rating;
    } else if (sortBy === "year") {
      result = a.year - b.year;
    } else if (sortBy === "title") {
      if (a.title < b.title) result = -1;
      else if (a.title > b.title) result = 1;
      else result = 0;
    }
    return sortDirection === "asc" ? result : -result;
  });

  //() => handleDelete(movie.id), hogy ne hivodjon meg rogton
  const movies_list = sortedMovies.map((movie) => {
    const isEditing = movie.id === editingId;
    return (
      <tr key={movie.id} className={isEditing ? "table-warning" : ""}>
        <td>
          <img
            className="ml"
            src={movie.thumbnail}
            alt={movie.title}
            style={{ objectFit: "cover", borderRadius: 6 }}
          />
        </td>
        <td>
          {isEditing ? (
            <input
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
              className="form-control"
            />
          ) : (
            movie.title
          )}
        </td>
        <td>{movie.year}</td>
        <td>
          <span className="badge bg-warning text-dark">{movie.rating}</span>
        </td>
        <td>
          {isEditing && (
            <Button
              className="btn-success btn-sm me-2"
              onClick={handleSave}
              disabled={editingTitle.trim() === ""}
            >
              Save
            </Button>
          )}

          {!isEditing && (
            <>
              <Button
                className="btn-danger btn-sm me-2"
                onClick={() => handleDelete(movie.id)}
              >
                Delete
              </Button>

              <Button
                className="btn-dark btn-sm"
                onClick={() => {
                  setEditingId(movie.id);
                  setEditingTitle(movie.title);
                }}
              >
                Edit
              </Button>
            </>
          )}
        </td>
      </tr>
    );
  });

  return (
    <Container className="mt-4 p-3 bg-white rounded shadow-sm">
    <div className="d-flex align-items-center mb-3 gap-2">
      <label htmlFor="sort-select" className="me- ml- fw-semibold" >Sort By:</label>
      <select
        id="sort-select"
        className="form-select form-select-sm"
        style={{ width: "140px" }}
        value={sortBy}
        onChange={(e) =>
          setSortBy(e.target.value as "rating" | "title" | "year")
        }
      >
        <option value="title">Alphabetical</option>
        <option value="rating">Rating</option>
        <option value="year">Year</option>
      </select>
      <button
        className="btn btn-dark btn-sm ms-2"
        onClick={() => setSortDirection((prev) => (prev ==="asc" ? "desc" :"asc") )}
      >
        {sortDirection === "asc" ? <SortUp /> : <SortDown />}
      </button>
      </div>
      <table className="table table-hover table-striped align-middle">
        <thead className="table-dark">
          <tr>
            <th style={{ width: "90px" }}>Poster</th>
            <th style={{ width: "50%" }}>Title</th>
            <th style={{ width: "100px" }}>Year</th>
            <th style={{ width: "100px" }}>Rating</th>
            <th style={{ width: "120px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>{movies_list}</tbody>
      </table>
    </Container>
  );
}
