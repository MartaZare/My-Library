import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GenreType } from "../../other/Types";
import Searchbar from "../../Searchbar";
import { FadeLoader } from "react-spinners";
import { API_URL } from "../../other/Constants";

export default function Genres() {
  const [genresList, setGeneresList] = useState<GenreType[]>([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/genres`).then((response) =>
      response.json().then((data: GenreType[]) => {
        setGeneresList(data);
        setSpinner(false);
      })
    );
  }, []);

  return (
    <div className="center-page">
      <div className="all-pages">
        {spinner && (
          <div style={{ marginTop: "20px" }}>
            <FadeLoader color={"#5786b4"} />
            Loading...
          </div>
        )}
        {!spinner && (
          <>
            <h1>Genres</h1>

            <Searchbar
              searchObjects={genresList.map((genre) => ({
                text: genre.title,
                id: genre.id,
              }))}
              type={"authors"}
            />

            <Link to="/add-new-genre" className="btn-link">
              New
            </Link>

            <div className="all-pages-links">
              {genresList.map((genre) => {
                return (
                  <div key={genre.id} className="page-link">
                    <Link to={`/genres/${genre.id}`}>{genre.title}</Link>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
