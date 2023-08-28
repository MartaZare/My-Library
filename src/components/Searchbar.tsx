import { useState } from "react";
import { Link } from "react-router-dom";

interface SearchProps {
  searchObjects: SearchObject[];
  type: string;
}

interface SearchObject {
  text: string;
  id: number;
}

export default function Searchbar(props: SearchProps) {
  const { searchObjects, type } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query === "") {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  function handleLink() {
    setIsVisible(false);
    setSearchQuery("");
  }

  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
        {isVisible && (
          <div className="search-result">
            {searchObjects
              .filter((object) =>
                object.text.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((searchObject) => (
                <div key={searchObject.id} className="search-item">
                  <Link to={`/${type}/${searchObject.id}`} onClick={handleLink}>
                    {searchObject.text && <h3>{searchObject.text}</h3>}
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
