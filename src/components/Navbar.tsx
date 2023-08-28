import { NavLink } from "react-router-dom";
import NavDropdown from "./NavDropdown";
import { useEffect, useState } from "react";

export default function Navbar() {
  function colorLink(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    (event.target as HTMLAnchorElement).style.textDecoration = "underline";

    const links = document.querySelectorAll(
      ".nav-link"
    ) as NodeListOf<HTMLAnchorElement>;
    links.forEach((link) => {
      if (link !== event.target) {
        link.style.textDecoration = "none";
      }
    });
  }

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsVisible(window.innerWidth < 600);
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="navigation">
      {!isVisible && (
        <nav>
          <NavLink to="/" className="nav-link" onClick={colorLink}>
            Library
          </NavLink>
          <NavLink to="/authors" className="nav-link" onClick={colorLink}>
            Authors
          </NavLink>
          <NavLink to="/genres" className="nav-link" onClick={colorLink}>
            Genres
          </NavLink>
          <NavLink to="/publishers" className="nav-link" onClick={colorLink}>
            Publishers
          </NavLink>
        </nav>
      )}
      {isVisible && <NavDropdown />}
    </div>
  );
}
