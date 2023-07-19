import React from "react";

function Header() {
  return (
    <div className="w-full bg-b3 text-white py-10 bg-[url('./assets/AccueilCine.jpeg')] bg-cover">
      <div className=" ml-4">
        <h1 className="text-4xl">Bienvenue</h1>
        <p className="text-2xl mt-4">
          Parcourez des millions de films, séries tv et suivez les actualités
          cinéma !
        </p>
      </div>
    </div>
  );
}

export default Header;
