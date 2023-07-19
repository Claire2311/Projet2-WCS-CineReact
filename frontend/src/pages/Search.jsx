import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FilmCard from "../components/FilmCard";
import ActorCard from "../components/ActorCard";
import MovieResults from "../components/MovieResults";
import TvResults from "../components/TvResults";
import PersonResults from "../components/PersonResults";

// Déclaration des variables d'environnement
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

// Déclaration des options de fetch sur l'API
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};
const sortQuery = (array, string) => {
  return array
    .filter((object) => object.media_type === string)
    .sort((a, b) => b.popularity - a.popularity);
};

export default function Search() {
  const [currentSearch, setCurrentSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [currentCategory, setCurrentCategory] = useState(0);

  const { query } = useParams();

  const categoryChange = (num) => {
    if (currentCategory !== num) {
      setCurrentCategory(num);
    }
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=fr-FR&page=1`,
      options
    )
      .then((res) => {
        if (!res.ok) {
          setIsValid(false);
        }
        return res.json();
      })
      .then((data) => {
        setCurrentSearch(data.results);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [query]);

  return (
    <main className="bg-white flex justify-center flex-grow">
      <div className="max-w-7xl flex md:flex-row flex-col flex-grow">
        <div className="flex">
          <div className="bg-gradient-to-b from-b1 to-b2 md:w-[14rem] w-full flex md:flex-col md:items-center md:justify-start justify-center md:rounded-lg gap-2 p-4 md:mb-3 md:mt-3">
            <button
              className={`text-b1 text-xl w-20 p-1.5 rounded-lg ${
                currentCategory === 0
                  ? "bg-b5 scale-105"
                  : "bg-white hover:bg-b5 hover:scale-105"
              }`}
              type="button"
              onClick={() => setCurrentCategory(0)}
            >
              Multiple
            </button>
            <button
              className={`text-b1 text-xl w-20 p-1.5 rounded-lg ${
                currentCategory === 1
                  ? "bg-b5 scale-105"
                  : "bg-white hover:bg-b5 hover:scale-105"
              }`}
              type="button"
              onClick={() => categoryChange(1)}
            >
              Films
            </button>
            <button
              className={`text-b1 text-xl w-20 p-1.5 rounded-lg ${
                currentCategory === 2
                  ? "bg-b5 scale-105"
                  : "bg-white hover:bg-b5 hover:scale-105"
              }`}
              type="button"
              onClick={() => categoryChange(2)}
            >
              Séries
            </button>
            <button
              className={`text-b1 text-xl w-20 p-1.5 rounded-lg ${
                currentCategory === 3
                  ? "bg-b5 scale-105"
                  : "bg-white hover:bg-b5 hover:scale-105"
              }`}
              type="button"
              onClick={() => categoryChange(3)}
            >
              Artistes
            </button>
          </div>
        </div>
        {isLoading && <p>Chargement en cours</p>}
        {!isValid && <p>Aucun résultat correspondant</p>}
        {!query && (
          <p className="w-full text-center p-10 text-2xl font-semibold">
            Effectuez une recherche à l'aide de la barre en haut de la page
          </p>
        )}
        {isValid && !isLoading && query && (
          <div className="md:ml-2 flex flex-col w-full my-3">
            <p className="text-center text-2xl font-semibold border-b-4 border-g1 py-2">
              Résultats de la recherche
            </p>
            {currentCategory === 0 && (
              <div className="flex flex-col">
                <div>
                  {sortQuery(currentSearch, "movie").length > 0 && (
                    <>
                      <h3 className="text-center text-2xl bg-g2 py-2">Films</h3>
                      <div className="flex justify-center flex-wrap border-b-4 border-g1">
                        {sortQuery(currentSearch, "movie").map((res) => (
                          <FilmCard
                            key={res.id}
                            id={res.id}
                            title={res.title}
                            releaseDate={res.release_date}
                            overview={res.overview}
                            posterPath={res.poster_path}
                            media="films"
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div>
                  {sortQuery(currentSearch, "tv").length > 0 && (
                    <>
                      <h3 className="text-center text-2xl bg-g2 py-2">
                        Séries
                      </h3>
                      <div className="flex justify-center flex-wrap border-b-4 border-g1">
                        {sortQuery(currentSearch, "tv").map((res) => (
                          <FilmCard
                            key={res.id}
                            id={res.id}
                            title={res.name}
                            releaseDate={res.first_air_date}
                            overview={res.overview}
                            posterPath={res.poster_path}
                            media="tv"
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div>
                  {sortQuery(currentSearch, "person").length > 0 && (
                    <>
                      <h3 className="text-center text-2xl bg-g2 py-2">
                        Artistes
                      </h3>
                      <div className="flex justify-center flex-wrap border-b-4 border-g1">
                        {sortQuery(currentSearch, "person").map((res) => (
                          <ActorCard
                            key={res.id}
                            id={res.id}
                            knownFor={res.known_for}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            {currentCategory === 1 && <MovieResults query={query} />}
            {currentCategory === 2 && <TvResults query={query} />}
            {currentCategory === 3 && <PersonResults query={query} />}
          </div>
        )}
      </div>
    </main>
  );
}
