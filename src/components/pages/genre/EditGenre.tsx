import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GenreType } from "../../other/Types";
import { FadeLoader } from "react-spinners";
import { API_URL, CURRENT_YEAR } from "../../other/Constants";

export default function EditGenre() {
  const { id } = useParams();
  const [edited, setEdited] = useState(false);
  const [spinner, setSpinner] = useState(true);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setSpinner(true);
    fetch(`${API_URL}/genres/${id}`)
      .then((response) => response.json())
      .then((data: GenreType) => {
        setTitle(data.title);
        setDate(data.date);
        setDescription(data.description);
        setSpinner(false);
      });
  }, [id]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    fetch(`${API_URL}/genres/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        date: date,
        description: description,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    setTitle("");
    setDate("");
    setDescription("");
    setEdited(true);
  }

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleDate = (event: ChangeEvent<HTMLSelectElement>) => {
    setDate(event.target.value);
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
                  <label htmlFor="title">Genre: </label>
                  <input
                    type="text"
                    name="title"
                    onChange={handleTitle}
                    value={title}
                    required
                  />
                </>
                <>
                  <label htmlFor="date">Century: </label>
                  <select
                    name="date"
                    onChange={handleDate}
                    value={date}
                    required
                  >
                    <option disabled>--select century--</option>
                    {(() => {
                      const array = [];
                      const CURRENT_DECADE = Math.floor(CURRENT_YEAR / 100 + 1);

                      for (let i = CURRENT_DECADE; i > 0; i--) {
                        array.push(<option key={i}>{i}</option>);
                      }
                      return array;
                    })()}
                  </select>
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
                <button type="submit">Save</button>
              </form>
            </>
          )}
          {edited && (
            <div className="success-message">
              <div>
                <img src="../../../img/success.png" alt="success-img" />
                <p>You have successfully edited the genre.</p>{" "}
              </div>
              <Link to={`/genres`} className="btn-link">
                Back to genres
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
