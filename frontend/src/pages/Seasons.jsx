import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import EpisodeCard from "../components/EpisodeCard";

function Seasons() {
  const { id, season } = useParams();
  const [episodes, setEpisodes] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [maxSeasons, setMaxSeasons] = useState();
  const [sortEpisode, setSortEpisode] = useState("asc");
  const [title, setTitle] = useState();

  const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbApiKey}`,
    },
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(`https://api.themoviedb.org/3/tv/${id}?language=fr-FR`, options, {
      signal,
    })
      .then((response) => response.json())
      .then((response) => {
        setMaxSeasons(response.number_of_seasons);
        setTitle(response.name);
      })
      .catch((err) => console.error(err));

    return function cleanup() {
      controller.abort();
    };
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${season}?language=fr-FR`,
      options,
      { signal }
    )
      .then((response) => response.json())
      .then((response) => {
        setEpisodes(response.episodes);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));

    setSortEpisode("asc");

    return function cleanup() {
      controller.abort();
    };
  }, [season]);

  const topOfThePage = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <main className="flex justify-center">
      {isLoading ? (
        <p>Chargement en cours</p>
      ) : (
        <div className="max-w-7xl">
          <div className="">
            <div className="flex flex-col items-center text-white pb-3 bg-gradient-to-b from-b2 to-b3">
              <Link to={`/tv/${id}`}>
                <h1 className="text-3xl mt-2">
                  {title}{" "}
                  <span className="text-2xl text-g1">
                    ({parseInt(episodes[0].air_date, 10)})
                  </span>
                </h1>
              </Link>
              <div className="flex">
                <p className="text-2xl font-bold">Saison {season} - </p>
                <p className="text-xl mx-2 mt-1">
                  Épisodes{" "}
                  <span className="text-base text-g1">{episodes.length}</span>
                </p>
              </div>
              <div className="flex w-11/12 mt-3 md:max-w-5xl justify-between text-xl">
                <Link
                  to={`/tv/${id}/seasons/${
                    parseInt(season, 10) === 1
                      ? parseInt(season, 10)
                      : parseInt(season, 10) - 1
                  }`}
                >
                  <div
                    className={parseInt(season, 10) === 1 ? "hidden" : "flex"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      />
                    </svg>

                    <p>Saison {parseInt(season, 10) - 1}</p>
                  </div>
                </Link>
                <Link
                  to={`/tv/${id}/seasons/${
                    parseInt(season, 10) === maxSeasons
                      ? parseInt(season, 10)
                      : parseInt(season, 10) + 1
                  }`}
                >
                  <div
                    className={
                      parseInt(season, 10) === maxSeasons ? "hidden" : "flex"
                    }
                  >
                    <p>Saison {parseInt(season, 10) + 1}</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex justify-end mr-2 md:max-w-6xl">
              <div className="flex flex-col items-end w-36 mt-4">
                <label
                  htmlFor="sortEpisode"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Tri par n° d'épisode
                </label>
                <select
                  name="sortEpisode"
                  id="sortEpisode"
                  value={sortEpisode}
                  onChange={(e) => setSortEpisode(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                >
                  <option value="asc">Ordre Croissant</option>
                  <option value="desc">Ordre Décroissant</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              {episodes &&
                episodes
                  .sort(
                    (a, b) =>
                      sortEpisode === "asc" &&
                      a.episode_number - b.episode_number
                  )
                  .sort(
                    (a, b) =>
                      sortEpisode === "desc" &&
                      b.episode_number - a.episode_number
                  )
                  .map((episode) => (
                    <EpisodeCard
                      key={episode.id}
                      id={episode.id}
                      title={episode.name}
                      overview={episode.overview}
                      date={episode.air_date}
                      runtime={episode.runtime}
                      image={episode.still_path}
                      number={episode.episode_number}
                    />
                  ))}
            </div>
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
                />
              </svg>

              <button type="button" className="" onClick={topOfThePage}>
                Revenir en haut de la page
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Seasons;
