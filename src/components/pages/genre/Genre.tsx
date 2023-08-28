import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GenreType } from "../../other/Types";
import { FadeLoader } from "react-spinners";
import { API_URL } from "../../other/Constants";

export default function Genre() {
  const { id } = useParams();
  const [spinner, setSpinner] = useState(true);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/genres/${id}`)
      .then((response) => response.json())
      .then((data: GenreType) => {
        setTitle(data.title);
        setDate(data.date);
        setDescription(data.description);
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
            <h1>{title}</h1>
            <p>
              {title} genre is considered to be created {date}th century.
            </p>
            <h2>About</h2>
            {description && <p>{description}</p>}
            <div className="edit-delete-btn">
              <Link to={`/genres/${id}/edit`} className="btn-link">
                Edit
              </Link>
              <Link
                to={`/genres/${id}/delete`}
                className="btn-link danger-button"
              >
                Delete
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
