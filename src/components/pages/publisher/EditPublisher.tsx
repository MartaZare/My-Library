import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PublisherType } from "../../other/Types";
import { FadeLoader } from "react-spinners";
import { API_URL, CURRENT_YEAR } from "../../other/Constants";

export default function EditPublisher() {
  const { id } = useParams();
  const [edited, setEdited] = useState(false);
  const [spinner, setSpinner] = useState(true);

  const [title, setTitle] = useState("");
  const [founded, setFounded] = useState("");
  const [founder, setFounder] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setSpinner(true);
    fetch(`${API_URL}/publishers/${id}`)
      .then((response) => response.json())
      .then((data: PublisherType) => {
        setTitle(data.title);
        setFounded(data.founded);
        setFounder(data.founder);
        setDescription(data.description);
        setSpinner(false);
      });
  }, [id]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    fetch(`${API_URL}/publishers/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        founded: founded,
        founder: founder,
        description: description,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    setTitle("");
    setFounded("");
    setFounder("");
    setDescription("");
    setEdited(true);
  }

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
                <button type="submit">Save</button>
              </form>
            </>
          )}
          {edited && (
            <div className="success-message">
              <div>
                <img src="../../../img/success.png" alt="success-img" />
                <p>You have successfully edited the publisher.</p>{" "}
              </div>
              <Link to={`/publishers`} className="btn-link">
                Back to publishers
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
