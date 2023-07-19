import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbUrlDiscover = import.meta.env.VITE_TMDB_URL_DISCOVER;
const tmdbUrlImage = import.meta.env.VITE_TMDB_URL_IMAGE;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${tmdbApiKey}`,
  },
};

function FilmCardRetro({ year, genre }) {
  const [movieRetro, setMovieRetro] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(
      `${tmdbUrlDiscover}movie?include_adult=false&include_video=false&language=fr-FR&page=1&primary_release_year=${parseInt(
        year,
        10
      )}&sort_by=revenue.desc&with_genres=${parseInt(genre, 10)}`,
      options,
      { signal }
    )
      .then((response) => response.json())
      .then((response) => {
        setMovieRetro(response.results[0]);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));

    return function cleanup() {
      controller.abort();
    };
  }, []);

  return (
    <main>
      {isLoading ? (
        <p>Chargement en cours</p>
      ) : (
        <div className="">
          <div className="md:flex">
            <Link to={`/films/${movieRetro?.id}`}>
              <img
                className="rounded-md w-72 md:mb-8"
                src={`${tmdbUrlImage}original/${movieRetro?.backdrop_path}`}
                alt={movieRetro?.title}
              />
            </Link>
            <div className="ml-4 mr-4 md:w-36">
              <div className="text-xl font-bold mt-2 md:mt-6">
                {movieRetro?.title}
              </div>
              <div className="text-xl mt-2 mb-8">
                {parseInt(movieRetro?.release_date, 10)}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default FilmCardRetro;

FilmCardRetro.propTypes = {
  year: PropTypes.number.isRequired,
  genre: PropTypes.string.isRequired,
};
