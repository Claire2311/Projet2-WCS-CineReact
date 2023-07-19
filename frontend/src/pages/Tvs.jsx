import { useState, useEffect } from "react";

import FilmCard from "../components/FilmCard";
import themeList from "../data/themeButtons.json";

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbUrl = import.meta.env.VITE_TMDB_URL;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${tmdbApiKey}`,
  },
};

export default function Tvs() {
  const [tvsLoading, setTvsLoading] = useState(true);
  const [tvs, setTvs] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("tv/top_rated");
  const [inputYear, setInputYear] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [apiOptions, setApiOptions] = useState(
    "tv/top_rated?language=fr-FR&page=1"
  );

  const date = new Date();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(`${tmdbUrl}genre/tv/list?language=fr`, options, {
      signal,
    })
      .then((res) => res.json())
      .then((resjson) => {
        setGenres(resjson.genres);
      })
      .catch((err) => console.error(err));

    return function cleanup() {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    setTvsLoading(true);
    const controller = new AbortController();
    const { signal } = controller;

    fetch(
      `${tmdbUrl}${apiOptions}&with_genres=${selectedGenre}&first_air_date_year=${selectedYear}&page=${page}`,
      options,
      {
        signal,
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setTvs(tvs ? [...tvs, ...response.results] : response.results);
        setTvsLoading(false);
      })
      .catch((err) => console.error(err));

    return function cleanup() {
      controller.abort();
    };
  }, [apiOptions, page, selectedGenre, selectedYear]);

  const handleTheme = (name, urloptions) => {
    if (name !== selectedTheme) {
      setTvs([]);
      setPage(1);
      setSelectedTheme(name);
      setApiOptions(`${name}${urloptions}`);
      setSelectedGenre("");
      setInputYear("");
      setSelectedYear("");
    }
  };

  const handleGenre = (id) => {
    if (selectedGenre !== id) {
      setTvs([]);
      setPage(1);
      setSelectedGenre(id);
    }
  };

  const handleReset = () => {
    if (selectedGenre !== "" || selectedYear !== "") {
      setTvs([]);
      setPage(1);
      setSelectedGenre("");
      setSelectedYear("");
      setInputYear("");
    }
  };

  const handleYear = (e) => {
    setInputYear(e.target.value);
  };

  const controlYear = (e) => {
    e.preventDefault();
    const year = parseInt(inputYear, 10);
    if (Number.isNaN(year) || year < 1900 || year > date.getFullYear()) {
      setShowModal(true);
    } else {
      setTvs([]);
      setPage(1);
      setSelectedYear(year);
    }
  };

  const showMore = () => {
    if (page < 90) {
      setPage(page + 1);
    }
  };

  return (
    <main className="bg-white text-3xl">
      <div className="flex flex-col md:flex-row md:justify-center">
        <div className=" md:max-w-xs md:min-h-screen md:ml-2 bg-gradient-to-b from-b1 to-b2 border-t border-white rounded-xl md:mx-0 mx-2 mt-2 mb-3">
          <div className="flex flex-col gap-1  p-4">
            <div className="md:collapse-open collapse collapse-plus">
              <input type="checkbox" />
              <h3 className="collapse-title border-b text-white text-2xl p-1 uppercase mb-2">
                Thème
              </h3>
              <div className="collapse-content flex flex-wrap justify-around gap-3 pb-3">
                {themeList[1].map((elem) => (
                  <button
                    className={` w-28 rounded-lg text-xl p-1 ${
                      selectedTheme.includes(elem.name)
                        ? "bg-b5 scale-105"
                        : "bg-white hover:bg-b5 hover:scale-105"
                    }`}
                    type="button"
                    key={elem.id}
                    onClick={() => handleTheme(elem.name, elem.options)}
                  >
                    {elem.title}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:collapse-open collapse collapse-plus">
              <input type="checkbox" />
              <h3 className="collapse-title border-b text-white text-2xl p-1 uppercase ">
                Genres
              </h3>
              <div className="collapse-content flex flex-wrap gap-1.5 mt-2 pb-3 text-base">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    className={`  flex-grow rounded-lg p-1 ${
                      selectedGenre === genre.id
                        ? "bg-b5 scale-105"
                        : "bg-white hover:bg-b5 hover:scale-105"
                    }`}
                    type="button"
                    onClick={() => handleGenre(genre.id)}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
            {selectedTheme === "tv/top_rated" ||
            selectedTheme === "tv/popular" ? (
              <div className="md:collapse-open collapse collapse-plus">
                <input type="checkbox" />
                <h3 className="collapse-title border-b text-white text-2xl p-1 uppercase ">
                  Année
                </h3>
                <form className="collapse-content text-xl flex gap-3 mt-2">
                  <input
                    className="rounded-lg text-center bg-white w-28 py-1"
                    id="inputYear"
                    type="text"
                    minLength="4"
                    maxLength="4"
                    placeholder="0000"
                    value={inputYear}
                    onChange={handleYear}
                  />
                  <button
                    type="submit"
                    className="bg-white hover:bg-b5 rounded-lg w-28 px-2 py-1"
                    onClick={controlYear}
                  >
                    Valider
                  </button>
                </form>
              </div>
            ) : null}
            <button
              type="button"
              className=" bg-b2 hover:bg-b3 text-white text-xl mt-4 p-1 rounded-lg "
              onClick={handleReset}
            >
              Réinitialiser les filtres
            </button>
          </div>
        </div>
        <div className="md:flex-grow md:max-w-4xl text-center mx-1">
          {tvsLoading ? (
            <p>I'll be faster writen in COBOL!</p>
          ) : (
            <div>
              <div className="md:flex md:flex-wrap md:max-w-4xl md:justify-center">
                {tvs &&
                  tvs.map((tv) => (
                    <FilmCard
                      key={tv.id}
                      id={tv.id}
                      title={tv.name}
                      releaseDate={tv.first_air_date}
                      overview={tv.overview}
                      posterPath={tv.poster_path}
                      media="tv"
                    />
                  ))}
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={showMore}
                  className=" text-white bg-gradient-to-r from-b2 to-b3 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-b2 dark:focus:ring-b3 font-medium rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-3"
                >
                  Afficher davantage
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-cente items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl text-b5 font-semibold">
                    Merci & Désolé
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-b5 text-lg leading-relaxed">
                    Merci de renseigner une année sous format YYYY et entre les
                    années 1900 et {date.getFullYear()}
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-g2 rounded-b">
                  <button
                    className="bg-b5 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setInputYear("");
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-g1" />
        </>
      ) : null}
    </main>
  );
}
