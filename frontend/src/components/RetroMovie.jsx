import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbUrlDiscover = import.meta.env.VITE_TMDB_URL_DISCOVER;
const tmdbUrlMovie = import.meta.env.VITE_TMDB_URL_MOVIE;
const tmdbUrlImage = import.meta.env.VITE_TMDB_URL_IMAGE;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${tmdbApiKey}`,
  },
};

function RetroMovie({
  shownRetro,
  setShownRetro,
  yearOfBirth,
  setYearOfBirth,
  setScrollPosition,
}) {
  const [movie, setMovie] = useState(null);
  const [revenues, setRevenues] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(
      `${tmdbUrlDiscover}movie?include_adult=false&include_video=false&language=fr-FR&page=1&primary_release_year=${parseInt(
        yearOfBirth,
        10
      )}&sort_by=revenue.desc`,
      options,
      { signal }
    )
      .then((response) => response.json())
      .then((response) => {
        setMovie(response.results[0]);
        setIsValid(true);
      })
      .catch((err) => console.error(err));

    return function cleanup() {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetch(`${tmdbUrlMovie}${movie?.id}?language=fr-FR`, options, { signal })
      .then((response) => response.json())
      .then((response) => {
        setRevenues(response);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));

    setScrollPosition();

    return function cleanup() {
      controller.abort();
    };
  }, [movie]);

  return (
    <main>
      {isLoading && !isValid ? (
        <p>Chargement en cours</p>
      ) : (
        <div className="flex justify-center">
          <div className="mx-8 flex flex-col mx-auto w-fit bg-white items-center">
            <p className="text-center text-3xl font-bold my-6">
              Notre suggestion
            </p>
            <div className="md:flex justify-center w-fit">
              <Link to={`/films/${movie?.id}`}>
                <img
                  className="rounded-md md:max-w-md"
                  src={`${tmdbUrlImage}original/${movie?.backdrop_path}`}
                  alt={movie?.title}
                />
              </Link>
              <div className="md:ml-8">
                <div className="text-center text-2xl font-bold mt-6">
                  {movie?.title}
                </div>
                <div className="text-center mt-2">
                  {parseInt(movie?.release_date, 10)}
                </div>
                <p className="text-center text-xl font-bold mt-4">Recette</p>
                <div className="text-center mt-2">
                  {revenues &&
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(revenues.revenue)}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="text-white bg-b1 rounded-lg text-md p-2 mx-auto my-4 bg-gradient-to-r from-b2 to-b3"
              onClick={() => {
                setShownRetro(!shownRetro);
                setYearOfBirth("");
              }}
            >
              Voir une autre année
            </button>
            <Link to={`/retro/${yearOfBirth}`}>
              <button
                type="button"
                className="text-white bg-b1 rounded-lg text-md py-2 mx-auto mb-4 px-2 bg-gradient-to-r from-b2 to-b3"
              >
                Envie d'en savoir plus ?
              </button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

export default RetroMovie;

RetroMovie.propTypes = {
  shownRetro: PropTypes.bool.isRequired,
  setShownRetro: PropTypes.func.isRequired,
  yearOfBirth: PropTypes.string.isRequired,
  setYearOfBirth: PropTypes.func.isRequired,
  setScrollPosition: PropTypes.func.isRequired,
};
