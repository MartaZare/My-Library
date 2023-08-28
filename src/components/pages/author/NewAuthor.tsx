import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Nationality from "../../other/Nationality";
import { API_URL } from "../../other/Constants";
import toast, { Toaster } from "react-hot-toast";

export default function NewAuthor() {
  const [created, setCreated] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [born, setBorn] = useState("");
  const [died, setDied] = useState("");
  const [nationality, setNationality] = useState("");
  const [novelsPublished, setNovelsPublished] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    fetch(`${API_URL}/authors`, {
      method: "POST",
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
    setName("");
    setSurname("");
    setBorn("");
    setDied("");
    setNationality("");
    setNovelsPublished("");
    setUrl("");
    setDescription("");
    setCreated(true);
  };

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
    setNovelsPublished(event.target.value);
  };
  const handleUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };
  const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  return (
    <div className="form-page">
      <Toaster position="top-center" reverseOrder={false} />
      {!created && (
        <>
          <h1>Create new author</h1>
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
              <label htmlFor="nationality">Nationality:</label>
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
              <label htmlFor="novelsPublished">Novels: </label>
              <input
                type="number"
                name="novelsPublished"
                onChange={handleNovels}
                min={0}
                value={novelsPublished}
              />
            </>
            <>
              <label htmlFor="url">Photo URL: </label>
              <input
                type="url"
                name="url"
                placeholder="https://images.com"
                pattern="https://.*"
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
            <button type="submit">Create</button>
          </form>
        </>
      )}
      {created && (
        <div className="success-message">
          <div>
            <img src="../../../img/success.png" alt="success-img" />
            <p>
              You have successfully added {name} {surname} author to your
              library!
            </p>
          </div>
          <Link to={`/authors`} className="btn-link">
            Back to authors
          </Link>
        </div>
      )}
    </div>
  );
}
