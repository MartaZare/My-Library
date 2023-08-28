import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthorType } from "../../other/Types";
import Searchbar from "../../Searchbar";
import { FadeLoader } from "react-spinners";
import { API_URL } from "../../other/Constants";

export default function Authors() {
  const [authorsList, setAuthorsList] = useState<AuthorType[]>([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/authors`).then((response) =>
      response.json().then((data) => {
        setAuthorsList(data);
        setSpinner(false);
      })
    );
  }, []);

  return (
    <div className="all-pages">
      {spinner && (
        <div style={{ marginTop: "20px" }}>
          <FadeLoader color={"#5786b4"} />
          Loading...
        </div>
      )}
      {!spinner && (
        <>
          <h1>Authors</h1>

          <Searchbar
            searchObjects={authorsList.map((author) => ({
              text: `${author.name} ${author.surname}`,
              id: author.id,
            }))}
            type={"authors"}
          />

          <Link to="/create-new-author" className="btn-link">
            New
          </Link>
          <div className="all-pages-links">
            {authorsList.map((author) => {
              return (
                <div key={author.id} className="page-link">
                  <Link to={`/authors/${author.id}`}>
                    {author.name} {author.surname}
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
