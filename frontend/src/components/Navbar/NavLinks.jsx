import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function NavLinks({ className }) {
  const links = [
    { id: 1, name: "Films", page: "films" },
    { id: 2, name: "Séries", page: "tv" },
    { id: 3, name: "Artistes", page: "artists" },
  ];

  return (
    <ul className={`${className}`}>
      {links.map((link) => (
        <li key={link.id}>
          <Link to={`${link.page}`}>{link.name}</Link>
        </li>
      ))}
    </ul>
  );
}

NavLinks.propTypes = {
  className: PropTypes.string.isRequired,
};

export default NavLinks;
