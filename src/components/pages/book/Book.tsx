import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AuthorType,
  BookType,
  GenreType,
  PublisherType,
} from "../../other/Types";
import { FadeLoader } from "react-spinners";
import { API_URL } from "../../other/Constants";

export default function Book() {
  const { id } = useParams();
  const [spinner, setSpinner] = useState(true);

  const [authorId, setAuthorId] = useState("");
  const [title, setTitle] = useState("");
  const [genreId, setGenreId] = useState("");
  const [publisherId, setPublisherId] = useState("");
  const [date, setDate] = useState("");
  const [pages, setPages] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const [authorSurname, setAuthorSurname] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setSpinner(true);
    fetch(`${API_URL}/books/${id}`)
      .then((response) => response.json())
      .then((data: BookType) => {
        setAuthorId(data.authorId);
        setTitle(data.title);
        setGenreId(data.genreId);
        setPublisherId(data.publisherId);
        setDate(data.date);
        setPages(data.pages);
        setDescription(data.description);
        setSpinner(false);
      });
  }, [id]);

  useEffect(() => {
    fetch(`${API_URL}/authors/${authorId}`)
      .then((response) => response.json())
      .then((data: AuthorType) => {
        setAuthorName(data.name);
        setAuthorSurname(data.surname);
      });
  }, [authorId]);

  useEffect(() => {
    fetch(`${API_URL}/genres/${genreId}`)
      .then((response) => response.json())
      .then((data: GenreType) => {
        setGenre(data.title);
      });
  }, [genreId]);

  useEffect(() => {
    fetch(`${API_URL}/publishers/${publisherId}`)
      .then((response) => response.json())
      .then((data: PublisherType) => {
        setPublisher(data.title);
      });
  }, [publisherId]);

  return (
    <div className="center-page">
      <div className="page">
        {spinner && (
          <div style={{ marginTop: "20px" }}>
            <FadeLoader color={"#5786b4"} />
            Loading...
          </div>
        )}
        {!spinner && (
          <>
            <h1 className="book-title">{title}</h1>
            <Link to={`/authors/${authorId}`}>
              <h2>
                by {authorName}
                {authorSurname}
              </h2>
            </Link>
            {description && (
              <>
                <h2>Description: </h2>
                <p>{description}</p>
              </>
            )}
            <table>
              <tr>
                <th>Genre</th>
                <th>Publisher</th>
                <th>Published in</th>
                <th>Pages</th>
              </tr>
              <tr>
                <td>
                  <Link to={`/genres/${genreId}`}>{genre}</Link>
                </td>
                <td>
                  <Link to={`/publishers/${publisherId}`}>{publisher}</Link>
                </td>
                <td>{date}</td>
                <td>{pages}</td>
              </tr>
            </table>
            <div className="edit-delete-btn">
              <Link to={`/books/${id}/edit`} className="btn-link">
                Edit
              </Link>
              <Link
                to={`/books/${id}/delete`}
                className="btn-link danger-button"
              >
                Delete
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
