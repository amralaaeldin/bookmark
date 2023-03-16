import { useState } from "react";
import Image from "next/image";

function Header() {
  const [open, setOpen] = useState(false);

  const toggleNav = () => {
    setOpen((open) => !open);
  };

  return (
    <header className="container">
      <div className="logo">
        {open ? (
          <Image
            width="148"
            height="25"
            src="/assets/logo-open.svg"
            alt="logo-open"
          />
        ) : (
          <Image
            width="148"
            height="25"
            src="/assets/logo-bookmark.svg"
            alt="logo-bookmark"
          />
        )}
      </div>
      <nav className={open ? "nav-open" : ""}>
        <ul>
          <li>features</li>
          <li>pricing</li>
          <li>contact</li>
        </ul>
        <button className={open ? "btn light" : "btn red"}>log in</button>
      </nav>
      <div className="container icon">
        {open ? (
          <Image
            width="17"
            height="15"
            className="list-icon"
            onClick={toggleNav}
            src="/assets/icon-close.svg"
            alt="icon-list"
          />
        ) : (
          <Image
            width="17"
            height="15"
            className="list-icon"
            onClick={toggleNav}
            src="/assets/icon-hamburger.svg"
            alt="icon-list"
          />
        )}
      </div>
    </header>
  );
}

export default Header;
