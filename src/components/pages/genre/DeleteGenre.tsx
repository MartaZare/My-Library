import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { GenreType } from "../../other/Types";
import { API_URL } from "../../other/Constants";

export default function DeleteGenre() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setSpinner(true);
    fetch(`${API_URL}/genres/${id}`)
      .then((response) => response.json())
      .then((data: GenreType) => {
        setTitle(data.title);
        setDeleted(false);
        setSpinner(false);
      });
  }, [id]);

  function handleDelete() {
    fetch(`${API_URL}/genres/${id}`, {
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
                  Are you sure you want to remove genre {title} from the
                  library?
                </p>
              </div>
              <div>
                <button onClick={handleDelete}>Yes</button>
                <Link to={`/genres/${id}`} className="btn-link">
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
                  You have successfully deleted genre {title} from the library.
                </p>
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
