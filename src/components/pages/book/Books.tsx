import { useEffect, useState } from "react";
import { AuthorType, BookType } from "../../other/Types";
import { Link } from "react-router-dom";
import Searchbar from "../../Searchbar";
import { FadeLoader } from "react-spinners";
import LibraryLayout from "../../LibraryLayout";
import BookCard from "../../BookCard";
import Filter from "../../Filter";
import { API_URL } from "../../other/Constants";

export default function Books() {
  const [booksList, setBooksList] = useState<BookType[]>([]);
  const [authorList, setAuthorList] = useState<AuthorType[]>([]);
  const [spinner, setSpinner] = useState(true);
  const [filtered, setFiltered] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/books`).then((response) =>
      response.json().then((data: BookType[]) => {
        setBooksList(data);
        setSpinner(false);
      })
    );
    fetch(`${API_URL}/authors`)
      .then((response) => response.json())
      .then((data: AuthorType[]) => setAuthorList(data));
  }, []);

  return (
    <LibraryLayout>
      {spinner && (
        <div style={{ marginTop: "20px" }}>
          <FadeLoader color={"#5786b4"} />
          Loading...
        </div>
      )}
      {!spinner && (
        <>
          <h1>Library</h1>
          <Searchbar
            searchObjects={booksList.map((book) => ({
              text: book.title,
              id: book.id,
            }))}
            type={"books"}
          />

          <Link to={`/create-new-book`} className="nav-link add-book-btn">
            <button>Add new book</button>
          </Link>

          <Filter
            authors={authorList}
            setFiltered={setFiltered}
            filtered={filtered}
          />

          <div className="book-shelf">
            {!filtered && (
              <>
                {booksList.map((book) => {
                  const author = authorList.find(
                    (author) => author.id === parseInt(book.authorId)
                  );
                  return (
                    <div key={book.id}>
                      <BookCard>
                        <Link to={`/books/${book.id}`} className="book-content">
                          <h2>{book.title}</h2>
                          {author && (
                            <h3>
                              by {author.name} {author.surname}
                            </h3>
                          )}
                        </Link>
                      </BookCard>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </>
      )}
    </LibraryLayout>
  );
}
