import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL, CURRENT_YEAR } from "../../other/Constants";
import toast, { Toaster } from "react-hot-toast";

export default function NewPublisher() {
  const [created, setCreated] = useState(false);
  const [title, setTitle] = useState("");
  const [founded, setFounded] = useState("");
  const [founder, setFounder] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    fetch(`${API_URL}/publishers`, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        founded: founded,
        founder: founder,
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
    setFounded("");
    setFounder("");
    setDescription("");
    setCreated(true);
  };

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleFounded = (event: ChangeEvent<HTMLSelectElement>) => {
    setFounded(event.target.value);
  };
  const handleFounder = (event: ChangeEvent<HTMLInputElement>) => {
    setFounder(event.target.value);
  };
  const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  return (
    <div className="form-page">
      <Toaster position="top-center" reverseOrder={false} />
      {!created && (
        <>
          <h1>Add new publisher</h1>
          <form className="form" onSubmit={handleSubmit}>
            <>
              <label htmlFor="title">Publisher: </label>
              <input
                type="text"
                name="title"
                onChange={handleTitle}
                value={title}
                required
              />
            </>
            <>
              <label htmlFor="founder">Founder: </label>
              <input
                type="text"
                name="founder"
                onChange={handleFounder}
                value={founder}
              />
            </>
            <>
              <label htmlFor="founded">Founded in: </label>
              <select
                name="founded"
                onChange={handleFounded}
                value={founded}
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
            <p>
              You have successfully added {title} publisher to your library!
            </p>
          </div>
          <Link to={`/publishers`} className="btn-link">
            Back to publishers
          </Link>
        </div>
      )}
    </div>
  );
}
