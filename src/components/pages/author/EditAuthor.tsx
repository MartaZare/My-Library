import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthorType } from "../../other/Types";
import { FadeLoader } from "react-spinners";
import Nationality from "../../other/Nationality";
import { API_URL } from "../../other/Constants";

export default function EditAuthor() {
  const { id } = useParams();
  const [edited, setEdited] = useState(false);
  const [spinner, setSpinner] = useState(true);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [born, setBorn] = useState("");
  const [died, setDied] = useState("");
  const [nationality, setNationality] = useState("");
  const [novelsPublished, setNovelsPublished] = useState(0);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setSpinner(true);
    fetch(`${API_URL}/authors/${id}`)
      .then((response) => response.json())
      .then((data: AuthorType) => {
        setName(data.name);
        setSurname(data.surname);
        setBorn(data.born);
        setDied(data.died);
        setNationality(data.nationality);
        setNovelsPublished(data.novelsPublished);
        setDescription(data.description);
        setUrl(data.url);
        setSpinner(false);
      });
  }, [id]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    fetch(`${API_URL}/authors/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        surname: surname,
        born: born,
        died: died,
        nationality: nationality,
        novelsPublished: novelsPublished,
        url: url,
        description: description,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    setName("");
    setSurname("");
    setBorn("");
    setDied("");
    setNationality("");
    setNovelsPublished(0);
    setUrl("");
    setDescription("");
    setEdited(true);
  }

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleSurname = (event: ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
  };
  const handleBirth = (event: ChangeEvent<HTMLInputElement>) => {
    setBorn(event.target.value);
  };
  const handleDeath = (event: ChangeEvent<HTMLInputElement>) => {
    setDied(event.target.value);
  };
  const handleNationality = (event: ChangeEvent<HTMLSelectElement>) => {
    setNationality(event.target.value);
  };
  const handleNovels = (event: ChangeEvent<HTMLInputElement>) => {
    setNovelsPublished(Number(event.target.value));
  };
  const handleUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
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
              <h1>
                Edit {name} {surname}
              </h1>
              <form className="form" onSubmit={handleSubmit}>
                <>
                  <label htmlFor="name">Name: </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleName}
                    value={name}
                    required
                  />
                </>
                <>
                  <label htmlFor="surname">Surname: </label>
                  <input
                    type="text"
                    name="surname"
                    onChange={handleSurname}
                    value={surname}
                    required
                  />
                </>
                <>
                  <label htmlFor="born">Birth date: </label>
                  <input
                    type="date"
                    name="born"
                    onChange={handleBirth}
                    value={born}
                    required
                  />
                </>
                <>
                  <label htmlFor="name">Death date:</label>
                  <input
                    type="date"
                    name="died"
                    onChange={handleDeath}
                    value={died}
                  />
                </>
                <>
                  <label htmlFor="nationality">Nationality</label>
                  <select
                    name="nationality"
                    onChange={handleNationality}
                    value={nationality}
                    required
                  >
                    <Nationality />
                    required
                  </select>
                </>
                <>
                  <label htmlFor="novelsPublished">Novels:</label>
                  <input
                    type="number"
                    name="novelsPublished"
                    onChange={handleNovels}
                    value={novelsPublished}
                    min={0}
                  />
                </>
                <>
                  <label htmlFor="url">Photo URL: </label>
                  <input
                    type="url"
                    name="url"
                    pattern="https://.*"
                    value={url}
                    onChange={handleUrl}
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
                <button type="submit">Save</button>
              </form>
            </>
          )}
          {edited && (
            <div className="success-message">
              <div>
                <img src="../../../img/success.png" alt="success-img" />
                <p>You have successfully edited the author.</p>
              </div>
              <Link to={`/authors`} className="btn-link">
                Back to authors
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
