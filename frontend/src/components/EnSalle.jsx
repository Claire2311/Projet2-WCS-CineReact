import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
// A l'heure actuelle, je ne sais pas comment me débarasser de l'import de swiper/css sans casser l'affichage du carrousel
import "swiper/css";
import "swiper/css/scrollbar";
import giveDate from "../services/giveDate";

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbUrlMovie = import.meta.env.VITE_TMDB_URL_MOVIE;
const tmdbUrlImage = import.meta.env.VITE_TMDB_URL_IMAGE;

function EnSalle() {
  const [playing, setPlaying] = useState([]);
  const [currentPlayingPage, setCurrentPlayingPage] = useState(1);
  // Déclaration de la fonction nextPlayingPage, qui va incrémenter la valeur du state "currentPlayingPage" de 1 lors du clic sur le bouton "Films suivants"
  const nextPlayingPage = () => {
    setCurrentPlayingPage((oldPage) => oldPage + 1);
  };
  // Déclaration de la fonction previousPlayingPage, qui va décrémenter la valeur du state "currentPlayingPage" de 1 lors du clic sur le bouton "Films précédents"
  const previousPlayingPage = () => {
    setCurrentPlayingPage((oldPage) => oldPage - 1);
  };

  // Déclaration des options de fetch sur l'API
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbApiKey}`,
    },
  };
  // Fetch de la liste de films en salle depuis l'API, stockage du tableau contenant cette liste dans le State "playing"
  // Utilisation de la variable isCancelled pour éviter que setPlaying change le State, provoquant le rerender, en cas de clics plus rapides que le chargement des données de l'API
  useEffect(() => {
    let isCancelled = false;
    fetch(
      `${tmdbUrlMovie}now_playing?language=fr-FR&page=${currentPlayingPage}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        if (!isCancelled) {
          setPlaying(data.results);
        }
      });
    return () => {
      isCancelled = true;
    };
  }, [currentPlayingPage]);

  return (
    <div className="mx-1.5">
      <h2 className="text-2xl my-7 font-bold">Films actuellement en salle</h2>
      <Swiper
        modules={[Scrollbar]}
        scrollbar={{ draggable: true }}
        // Responsive sur plusieurs breakpoints
        breakpoints={{
          0: { width: 500, slidesPerView: 2 },

          640: {
            width: 640,
            slidesPerView: 2.5,
          },

          768: { width: 768, slidesPerView: 3.5 },
        }}
        spaceBetween={10}
      >
        {playing.map((film) => (
          <SwiperSlide key={film.id}>
            <Link to={`/films/${film.id}`}>
              <img
                className="rounded-lg"
                src={`${tmdbUrlImage}w200${film.poster_path}`}
                alt={film.title}
              />
              <p className="font-bold">{film.title}</p>
            </Link>
            <p className="mb-4">{giveDate(film.release_date)}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      {currentPlayingPage > 1 && (
        <button
          className="p-3 m-5 border-2 rounded-lg"
          type="button"
          onClick={() => {
            previousPlayingPage();
          }}
        >
          Films précédents
        </button>
      )}
      {currentPlayingPage < 90 && (
        <button
          className="p-3 m-5 border-2 rounded-lg"
          type="button"
          onClick={() => {
            nextPlayingPage();
          }}
        >
          Films suivants
        </button>
      )}
    </div>
  );
}

export default EnSalle;
