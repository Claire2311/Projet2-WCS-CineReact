import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import NavLinks from "./NavLinks";

import logo from "../../assets/logo.svg";
import burger from "../../assets/menu-icon.svg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`);
    } else {
      navigate("/search");
    }
  };
  const handleChange = (event) => {
    const input = event.target;
    if (input.value.length <= 25) {
      setQuery(input.value);
    }
  };

  return (
    <nav className="flex justify-center bg-gradient-to-r from-b1 to-b2 text-white ">
      <div className="max-w-7xl w-full">
        <div className="flex w-full justify-between items-center">
          <Link to="/">
            <img src={logo} height="100px" width="200px" alt="CineReact logo" />
          </Link>
          <div className="hidden md:flex">
            <form onSubmit={handleSubmit}>
              <input
                className="bg-white text-b1 rounded-full mr-2 w-48 h-8 px-2"
                name="searchbar"
                type="text"
                placeholder="Recherchez des films, séries, acteurs..."
                onChange={handleChange}
                value={query}
              />
              <input
                className="mr-6 rounded-full bg-red px-3 h-8 bg-gradient-to-r from-b3 to-b5 hover:cursor-pointer"
                type="submit"
                value="RECHERCHER"
              />
            </form>
            <NavLinks className="md:flex hidden gap-5 pr-6 text-2xl uppercase" />
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="mr-5"
              onClick={() => setOpen(!open)}
            >
              <img
                className={`h-7 duration-500 ${
                  open ? "rotate-90" : "rotate-0"
                }`}
                src={burger}
                alt="burger menu"
              />
            </button>
          </div>
        </div>
        {open && (
          <div className="flex flex-col">
            <NavLinks
              tabIndex={0}
              className={`md:hidden text-3xl flex justify-around pb-4 uppercase `}
            />
            <form className="flex justify-center" onSubmit={handleSubmit}>
              <input
                className="bg-white text-b1 rounded-full mr-2 w-3/5 h-8 px-2"
                name="searchbar"
                type="text"
                placeholder="Recherchez des films, séries, acteurs..."
                onChange={handleChange}
                value={query}
              />
              <input
                className="rounded-full bg-red px-3 h-8 mb-3 bg-gradient-to-r from-b3 to-b5 hover:cursor-pointer"
                type="submit"
                value="RECHERCHER"
              />
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}
