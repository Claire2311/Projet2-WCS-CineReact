import { useState, useEffect } from "react";

import ActorCard from "../components/ActorCard";

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${tmdbApiKey}`,
  },
};

export default function Actors() {
  const [actors, setActors] = useState();
  const [page, setPage] = useState(1);
  const [filterGender, setfilterGender] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function showMore() {
    if (page <= 90) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(
      `https://api.themoviedb.org/3/person/popular?language=fr-FR&page=${page}`,
      options,
      { signal }
    )
      .then((response) => response.json())
      .then((response) => {
        setActors(actors ? [...actors, ...response.results] : response.results);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));

    return function cleanup() {
      controller.abort();
    };
  }, [page]);

  const handleClick = (e) => {
    if (filterGender === parseInt(e.target.value, 10)) {
      setfilterGender(null);
    } else {
      setfilterGender(parseInt(e.target.value, 10));
    }
  };

  return (
    <main className="bg-white">
      {isLoading ? (
        <p>Chargement en cours</p>
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row lg:mr-28">
            <div className="bg-gradient-to-r from-b1 to-b2 m-6 rounded-md">
              <div className="md:collapse-open collapse collapse-plus">
                <input type="checkbox" />
                <h2 className="collapse-title text-2xl text-white border-b border-b-white mx-2 my-4 ">
                  Genres
                </h2>
                <div className="collapse-content md:flex">
                  <button
                    type="button"
                    value="1"
                    onClick={handleClick}
                    className={`rounded-lg border-b1 text-b1 text-center font-medium text-base px-5 py-2.5 mx-2 mb-6 ${
                      filterGender === 1
                        ? "bg-b5 scale-105"
                        : "bg-white hover:bg-b5 hover:scale-105"
                    }`}
                  >
                    Femme
                  </button>
                  <button
                    type="button"
                    value="2"
                    onClick={handleClick}
                    className={`rounded-lg border-b1 text-b1 text-center font-medium text-base px-5 py-2.5 mx-2 mb-6 ${
                      filterGender === 2
                        ? "bg-b5 scale-105"
                        : "bg-white hover:bg-b5 hover:scale-105"
                    }`}
                  >
                    Homme
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-wrap justify-center md:max-w-4xl">
                {actors &&
                  actors
                    .filter(
                      (elem) =>
                        filterGender === null || elem.gender === filterGender
                    )
                    .map((actor) => (
                      <ActorCard
                        key={actor.id}
                        id={actor.id}
                        knownFor={actor.known_for}
                      />
                    ))}
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={showMore}
                  className="text-xl text-white bg-gradient-to-r from-b2 to-b3 hover:bg-gradient-to-bl focus:outline-none focus:ring-b2 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Afficher davantage
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
