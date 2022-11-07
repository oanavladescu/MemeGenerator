import React from "react";
import logo from "../images/troll-face.png";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="troll-face" className="header-img" />
      <h2 className="header-title">Meme Generator</h2>
      <h4 className="header-react">Powered by React</h4>
    </header>
  );
}

export default Header;
