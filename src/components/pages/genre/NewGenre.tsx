import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL, CURRENT_YEAR } from "../../other/Constants";
import toast, { Toaster } from "react-hot-toast";

export default function NewGenre() {
  const [created, setCreated] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    fetch(`${API_URL}/genres`, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        date: date,
        description: description,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (!response.ok) {
        toast.error("Server issues please try again later.");
        setCreated(false);
      } else {
        handleSuccessfulSubmit();
      }
    });
  }

  const handleSuccessfulSubmit = () => {
    setTitle("");
    setDate("");
    setDescription("");
    setCreated(true);
  };

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
      <Toaster position="top-center" reverseOrder={false} />
      {!created && (
        <>
          <h1>Add new genre</h1>
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
              <select name="date" onChange={handleDate} value={date} required>
                <option value="" disabled>
                  --select century--
                </option>

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
            <button type="submit">Create</button>
          </form>
        </>
      )}
      {created && (
        <div className="success-message">
          <div>
            <img src="../../../img/success.png" alt="success-img" />
            <p>You have successfully added {title} genre to your library!</p>
          </div>
          <Link to={`/genres`} className="btn-link">
            Back to genres
          </Link>
        </div>
      )}
    </div>
  );
}
