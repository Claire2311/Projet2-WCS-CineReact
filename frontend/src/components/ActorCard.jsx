import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import getGender from "../services/getGender";

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${tmdbApiKey}`,
  },
};

function ActorCard({ id, knownFor }) {
  const [identity, setIdentity] = useState();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(`https://api.themoviedb.org/3/person/${id}?language=fr-FR`, options, {
      signal,
    })
      .then((response) => response.json())
      .then((response) => setIdentity(response))
      .catch((err) => console.error(err));

    return function cleanup() {
      controller.abort();
    };
  }, []);

  return (
    <div>
      {identity && (
        <Link className="text-2xl" to={`/artists/${id}`}>
          <div
            href="#"
            className="flex flex-col border border-g2 rounded-lg shadow mx-2 my-2.5 w-36"
          >
            <img
              src={
                identity.profile_path
                  ? `https://www.themoviedb.org/t/p/original${identity.profile_path}`
                  : getGender(identity)
              }
              alt="profile"
            />
            <div className="flex flex-col p-3 pt-4 h-24">
              <p className="text-sm font-bold ">{identity.name}</p>
              <p className="text-sm mb-3 text-g1">
                {`${knownFor
                  .filter((movie) => movie.title)
                  .map((movie) => movie.title)
                  .join(", ")
                  .slice(0, 33)}...`}
              </p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

export default ActorCard;

ActorCard.propTypes = {
  id: PropTypes.number.isRequired,
  knownFor: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    })
  ).isRequired,
};
