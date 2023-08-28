import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PublisherType } from "../../other/Types";
import Searchbar from "../../Searchbar";
import { FadeLoader } from "react-spinners";
import { API_URL } from "../../other/Constants";

export default function Publishers() {
  const [publishersList, setPublishersList] = useState<PublisherType[]>([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/publishers`).then((response) =>
      response.json().then((data: PublisherType[]) => {
        setPublishersList(data);
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
          <h1>Publishers</h1>
          <Searchbar
            searchObjects={publishersList.map((publisher) => ({
              text: publisher.title,
              id: publisher.id,
            }))}
            type={"publishers"}
          />
          <Link to="/add-new-publisher" className="btn-link">
            New
          </Link>
          <div className="all-pages-links">
            {publishersList.map((publisher) => {
              return (
                <div key={publisher.id} className="page-link">
                  <Link to={`/publishers/${publisher.id}`}>
                    {publisher.title}
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
