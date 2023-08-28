import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookType, AuthorType } from "../../other/Types";
import { FadeLoader } from "react-spinners";
import { API_URL } from "../../other/Constants";

export default function Author() {
  const { id } = useParams();
  const [books, setBooks] = useState<BookType[]>([]);
  const [spinner, setSpinner] = useState(true);

  const [idAuthor, setIdAuthor] = useState(0);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [born, setBorn] = useState("");
  const [died, setDied] = useState("");
  const [nationality, setNationality] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [novelsPublished, setNovelsPublished] = useState(0);

  useEffect(() => {
    setSpinner(true);
    fetch(`${API_URL}/authors/${id}`)
      .then((response) => response.json())
      .then((data: AuthorType) => {
        setIdAuthor(data.id);
        setName(data.name);
        setSurname(data.surname);
        setBorn(data.born);
        setDied(data.died);
        setNationality(data.nationality);
        setNovelsPublished(data.novelsPublished);
        setDescription(data.description);
        setUrl(data.url);
      });

    fetch(`${API_URL}/books/?authorId=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setSpinner(false);
      });
  }, [id]);

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
            <div className="information-wrapper">
              {url && (
                <img width="250" height="300" src={url} alt="authorPhoto" />
              )}
              <div>
                <h2 className="author-name">
                  {name} {surname}
                </h2>
                <p>
                  {name} {surname} is an {nationality} author born in {born}.
                  {novelsPublished &&
                    `During life 
        ${name} published ${novelsPublished} novels${
                      died && ` and died in ${died}`
                    }.`}
                </p>
              </div>
            </div>
            {description && (
              <>
                <h2>About</h2>
                <p>{description}</p>
              </>
            )}
            <div className="edit-delete-btn">
              <Link to={`/authors/${id}/edit`} className="btn-link">
                Edit
              </Link>
              <Link
                to={`/authors/${idAuthor}/delete`}
                className="danger-button btn-link"
              >
                Delete
              </Link>
            </div>
            <div className="author-books">
              {books.map((book) => {
                return (
                  <ul>
                    <li key={book.id}>
                      <Link to={`/books/${book.id}`}>{book.title}</Link>
                    </li>
                  </ul>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
