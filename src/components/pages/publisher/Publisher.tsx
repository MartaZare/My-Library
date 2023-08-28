import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PublisherType } from "../../other/Types";
import { FadeLoader } from "react-spinners";
import { API_URL } from "../../other/Constants";

export default function Publisher() {
  const { id } = useParams();
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
            <table>
              <tr>
                <td
                  className="table-name"
                  colSpan={3}
                  style={{ fontWeight: "bolder" }}
                >
                  Summary
                </td>
              </tr>
              <tr>
                <th>Name</th>
                <th>Founder</th>
                <th>Founded in</th>
              </tr>
              <tr>
                <td>{title}</td>
                <td>{founder}</td>
                <td>{founded}</td>
              </tr>
            </table>
            {description && (
              <>
                <h2>About</h2>
                <p>{description}</p>
              </>
            )}
            <div className="edit-delete-btn">
              <Link to={`/publishers/${id}/edit`} className="btn-link">
                Edit
              </Link>
              <Link
                to={`/publishers/${id}/delete`}
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
