import React from "react";
import { slide as Menu } from "react-burger-menu";

class NavDropdown extends React.Component {
  showSettings(event: any) {
    event.preventDefault();
  }

  render() {
    return (
      <Menu>
        <h2>Meniu</h2>
        <a href="/">Library</a>
        <a href="/authors">Authors</a>
        <a href="/genres">Genres</a>
        <a href="/publishers">Publishers</a>
      </Menu>
    );
  }
}

export default NavDropdown;
