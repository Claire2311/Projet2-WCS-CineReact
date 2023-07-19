import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import searchMore from "../services/searchMore";
import FilmCard from "./FilmCard";

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

export default function MovieResults({ query }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [searchPage, setSearchPage] = useState(1);
  const [movieResults, setMovieResults] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=fr-FR&page=${searchPage}`,
      options
    )
      .then((res) => {
        if (!res.ok) {
          setIsValid(false);
        }
        return res.json();
      })
      .then((data) => {
        setMovieResults(
          searchPage !== 1 ? [...movieResults, ...data.results] : data.results
        );
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [searchPage, query]);
  return (
    <main className="flex flex-col">
      <div className="flex flex-col items-center">
        {isValid && !isLoading && query && (
          <>
            <h3 className="w-full text-center text-2xl bg-g2 py-2">Films</h3>
            <div className="flex md:justify-center justify-start flex-wrap border-b-4 border-g1">
              {movieResults.map((res) => (
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
            <button
              className="bg-gradient-to-r from-b2 to-b3 text-white p-2 mt-2 rounded-lg"
              type="button"
              onClick={() => searchMore(searchPage, setSearchPage)}
            >
              Afficher plus de résultats
            </button>
          </>
        )}
      </div>
    </main>
  );
}
MovieResults.propTypes = {
  query: PropTypes.string.isRequired,
};
