import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { AuthorType } from "../../other/Types";
import { API_URL } from "../../other/Constants";

export default function DeleteAuthor() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setSpinner(true);
    fetch(`${API_URL}/authors/${id}`)
      .then((response) => response.json())
      .then((data: AuthorType) => {
        setName(data.name);
        setSurname(data.surname);
        setDeleted(false);
        setSpinner(false);
      });
  }, [id]);

  function handleDelete() {
    fetch(`${API_URL}/authors/${id}`, {
      method: "DELETE",
    });
    setDeleted(true);
  }

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
          {!deleted && (
            <div className="danger-message">
              <div>
                <img src="../../../img/danger.png" alt="danger-img" />
                <p>
                  Are you sure you want to remove author {name} {surname} from
                  the library?
                </p>
              </div>
              <div>
                <button onClick={handleDelete}>Yes</button>
                <Link to={`/authors/${id}`} className="btn-link">
                  No
                </Link>
              </div>
            </div>
          )}
          {deleted && (
            <div className="success-message">
              <div>
                <img src="../../../img/success.png" alt="success-img" />
                <p>
                  You have successfully deleted author {name} {surname} from the
                  library
                </p>
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
