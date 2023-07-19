import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Scrollbar } from "swiper";
// A l'heure actuelle, je ne sais pas comment me débarasser de l'import de swiper/css sans casser l'affichage du carrousel
import "swiper/css";
import "swiper/css/scrollbar";
import giveDate from "../services/giveDate";

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbUrlMovie = import.meta.env.VITE_TMDB_URL_MOVIE;
const tmdbUrlImage = import.meta.env.VITE_TMDB_URL_IMAGE;

const Top20 = () => {
  const [topFilms, setTopFilms] = useState([]);

  // Déclaration des options de fetch sur l'API
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbApiKey}`,
    },
  };
  // Fetch de la liste de films en salle depuis l'API, stockage du tableau contenant cette liste dans le State "playing"

  useEffect(() => {
    let isCancelled = false;
    fetch(`${tmdbUrlMovie}top_rated?language=fr-FR&page=1`, options)
      .then((response) => response.json())
      .then((data) => {
        if (!isCancelled) {
          setTopFilms(data.results);
        }
      });
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="mx-1.5">
      <h2 className="text-2xl my-7 font-bold">Top 20 </h2>
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

          768: {
            width: 768,
            slidesPerView: 3.5,
          },
        }}
        spaceBetween={25}
      >
        {topFilms.map((film) => (
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
    </div>
  );
};

export default Top20;
