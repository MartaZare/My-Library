import { AuthorType, BookType } from "./other/Types";
import { useState, ChangeEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import BookCard from "./BookCard";

interface FilterProps {
  authors: AuthorType[];
  filtered: boolean;
  setFiltered: (arg: boolean) => void;
}

export default function Filter(props: FilterProps) {
  const { authors, setFiltered, filtered } = props;
  const [authorId, setAuthorId] = useState("");
  const [authorsBooks, setAuthorsBooks] = useState<BookType[]>([]);
  const [spinner, setSpinner] = useState(true);
  const [authorName, setAuthorName] = useState("");

  const handleFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    setAuthorId(event.target.value);
    setFiltered(true);
    if (event.target.value === "all") {
      setFiltered(false);
    }
  };

  useEffect(() => {
    setSpinner(true);
    fetch(`http://localhost:3000/books?authorId=${authorId}`)
      .then((response) => response.json())
      .then((books: BookType[]) => {
        setAuthorsBooks(books);
        setSpinner(false);
      });

    fetch(`http://localhost:3000/authors/${authorId}`)
      .then((response) => response.json())
      .then((data: AuthorType) => {
        setAuthorName(data.name + data.surname);
      });
  }, [authorId]);

  return (
    <>
      <select value={authorId} onChange={handleFilter} className="filter">
        <option value="" disabled>
          Filter by author
        </option>
        <option value="all">All</option>
        {authors.map((author) => {
          return (
            <option key={author.id} value={author.id}>
              {author.name} {author.surname}
            </option>
          );
        })}
      </select>
      {filtered && (
        <>
          {spinner && (
            <div style={{ marginTop: "20px" }}>
              <FadeLoader color={"#5786b4"} />
              Loading...
            </div>
          )}
          {!spinner && (
            <>
              <div className="book-shelf">
                {authorId &&
                  authorsBooks.map((book) => (
                    <div key={book.id}>
                      <BookCard>
                        <Link to={`/books/${book.id}`} className="book-content">
                          <h2>{book.title}</h2>
                          <h3>by {authorName}</h3>
                        </Link>
                      </BookCard>
                    </div>
                  ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
