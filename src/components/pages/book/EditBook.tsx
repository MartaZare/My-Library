import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AuthorType,
  BookType,
  GenreType,
  PublisherType,
} from "../../other/Types";
import { FadeLoader } from "react-spinners";
import { API_URL, CURRENT_YEAR } from "../../other/Constants";

export default function EditBook() {
  const { id } = useParams();
  const [edited, setEdited] = useState(false);
  const [spinner, setSpinner] = useState(true);

  const [genresList, setGenresList] = useState<GenreType[]>([]);
  const [authorsList, setAuthorsList] = useState<AuthorType[]>([]);
  const [publishersList, setPublishersList] = useState<PublisherType[]>([]);
  const [authorId, setAuthorId] = useState("");
  const [title, setTitle] = useState("");
  const [genreId, setGenreId] = useState("");
  const [publisherId, setPublisherId] = useState("");
  const [date, setDate] = useState("");
  const [pages, setPages] = useState<number>();
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
    fetch(`${API_URL}/authors`)
      .then((response) => response.json())
      .then((data: AuthorType[]) => {
        setAuthorsList(data);
      });

    fetch(`${API_URL}/genres`)
      .then((response) => response.json())
      .then((data: GenreType[]) => {
        setGenresList(data);
      });

    fetch(`${API_URL}/publishers`)
      .then((response) => response.json())
      .then((data: PublisherType[]) => {
        setPublishersList(data);
      });
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    fetch(`${API_URL}/books/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        authorId: authorId,
        title: title,
        genreId: genreId,
        publisherId: publisherId,
        date: date,
        pages: pages,
        description: description,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    setAuthorId("");
    setTitle("");
    setGenreId("");
    setPublisherId("");
    setDate("");
    setPages(undefined);
    setDescription("");
    setEdited(true);
  }

  const handleAuthor = (event: ChangeEvent<HTMLSelectElement>) => {
    setAuthorId(event.target.value);
  };
  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleGenre = (event: ChangeEvent<HTMLSelectElement>) => {
    setGenreId(event.target.value);
  };
  const handlePublisher = (event: ChangeEvent<HTMLSelectElement>) => {
    setPublisherId(event.target.value);
  };
  const handleDate = (event: ChangeEvent<HTMLSelectElement>) => {
    setDate(event.target.value);
  };
  const handlePages = (event: ChangeEvent<HTMLInputElement>) => {
    setPages(Number(event.target.value));
  };
  const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  return (
    <div className="form-page">
      {spinner && (
        <div style={{ marginTop: "20px" }}>
          <FadeLoader color={"#5786b4"} />
          Loading...
        </div>
      )}
      {!spinner && (
        <>
          {!edited && (
            <>
              <h1>Edit {title}</h1>
              <form className="form" onSubmit={handleSubmit}>
                <>
                  <label htmlFor="author">Author: </label>
                  <select
                    name="author"
                    onChange={handleAuthor}
                    value={authorId}
                    required
                  >
                    <option value="" disabled>
                      --select author--
                    </option>
                    {authorsList.map((author) => {
                      return (
                        <option key={author.id} value={author.id}>
                          {author.name.concat(" ", author.surname)}
                        </option>
                      );
                    })}
                  </select>
                </>
                <>
                  <label htmlFor="title">Title: </label>
                  <input
                    type="text"
                    name="title"
                    onChange={handleTitle}
                    value={title}
                    required
                  />
                </>
                <>
                  <label htmlFor="genre">Genre: </label>
                  <select
                    name="genre"
                    onChange={handleGenre}
                    value={genreId}
                    required
                  >
                    <option value="" disabled>
                      --select genre--
                    </option>
                    {genresList.map((genre) => {
                      return (
                        <option key={genre.id} value={genre.id}>
                          {genre.title}
                        </option>
                      );
                    })}
                  </select>
                </>
                <>
                  <label htmlFor="publisher">Publisher: </label>
                  <select
                    name="publisher"
                    onChange={handlePublisher}
                    value={publisherId}
                    required
                  >
                    <option value="" disabled>
                      --select publisher--
                    </option>
                    {publishersList.map((publisher) => {
                      return (
                        <option key={publisher.id} value={publisher.id}>
                          {publisher.title}
                        </option>
                      );
                    })}
                  </select>
                </>
                <>
                  <label htmlFor="date">Date: </label>
                  <select
                    name="date"
                    onChange={handleDate}
                    value={date}
                    required
                  >
                    <option value="" disabled>
                      --select year--
                    </option>
                    {(() => {
                      const array = [];
                      for (let i = CURRENT_YEAR; i > 0; i--) {
                        array.push(
                          <option key={i} value={i}>
                            {i}
                          </option>
                        );
                      }
                      return array;
                    })()}
                  </select>
                </>
                <>
                  <label htmlFor="pages">Pages: </label>
                  <input
                    type="number"
                    name="pages"
                    onChange={handlePages}
                    value={pages}
                    min={0}
                    required
                  />
                </>
                <>
                  <label htmlFor="description">Description: </label>
                  <textarea
                    name="description"
                    rows={5}
                    onChange={handleDescription}
                    value={description}
                  />
                </>
                <button type="submit">Update</button>
              </form>
            </>
          )}
          {edited && (
            <div className="success-message">
              <div>
                <img src="../../../img/success.png" alt="success-img" />
                <p>You have successfully updated book information!</p>
              </div>
              <Link to={`/`} className="btn-link">
                Back to library
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
