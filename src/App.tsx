import Author from "./components/pages/author/Author";
import Authors from "./components/pages/author/Authors";
import DeleteAuthor from "./components/pages/author/DeleteAuthor";
import EditAuthor from "./components/pages/author/EditAuthor";
import NewAuthor from "./components/pages/author/NewAuthor";

import Book from "./components/pages/book/Book";
import Books from "./components/pages/book/Books";
import DeleteBook from "./components/pages/book/DeleteBook";
import EditBook from "./components/pages/book/EditBook";
import NewBook from "./components/pages/book/NewBook";

import Genre from "./components/pages/genre/Genre";
import Genres from "./components/pages/genre/Genres";
import DeleteGenre from "./components/pages/genre/DeleteGenre";
import EditGenre from "./components/pages/genre/EditGenre";
import NewGenre from "./components/pages/genre/NewGenre";

import Publisher from "./components/pages/publisher/Publisher";
import Publishers from "./components/pages/publisher/Publishers";
import DeletePublisher from "./components/pages/publisher/DeletePublisher";
import EditPublisher from "./components/pages/publisher/EditPublisher";
import NewPublisher from "./components/pages/publisher/NewPublisher";

import { Route, BrowserRouter, Routes, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./style/App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/books/:id" element={<Book />} />
          <Route path="/create-new-book" element={<NewBook />} />
          <Route path="/books/:id/delete" element={<DeleteBook />} />
          <Route path="/books/:id/edit" element={<EditBook />} />

          <Route path="/authors" element={<Authors />} />
          <Route path="/authors/:id" element={<Author />} />
          <Route path="/create-new-author" element={<NewAuthor />} />
          <Route path="/authors/:id/delete" element={<DeleteAuthor />} />
          <Route path="/authors/:id/edit" element={<EditAuthor />} />

          <Route path="/genres" element={<Genres />} />
          <Route path="/genres/:id" element={<Genre />} />
          <Route path="/add-new-genre" element={<NewGenre />} />
          <Route path="/genres/:id/delete" element={<DeleteGenre />} />
          <Route path="/genres/:id/edit" element={<EditGenre />} />

          <Route path="/publishers" element={<Publishers />} />
          <Route path="/publishers/:id" element={<Publisher />} />
          <Route path="/add-new-publisher" element={<NewPublisher />} />
          <Route path="/publishers/:id/delete" element={<DeletePublisher />} />
          <Route path="/publishers/:id/edit" element={<EditPublisher />} />

          <Route
            path="*"
            element={
              <div>
                <h1>ERROR 404. Page not found</h1>
                <Link to="/">Back to home page.</Link>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
