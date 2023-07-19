import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

// A l'heure actuelle, je ne sais pas comment me débarasser de l'import de swiper/css sans casser l'affichage du carrousel
import giveDate from "../services/giveDate";
import "swiper/css";
import pictureHolder from "../assets/picture-holder.png";
// Déclaration des variables d'environnement
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const urlDiscover = import.meta.env.VITE_TMDB_URL_DISCOVER;
const urlImage = import.meta.env.VITE_TMDB_URL_IMAGE;
// Déclaration des options de fetch sur l'API
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};

let searchOption;

const CarrouselKnownFor = ({ specialty, id }) => {
  const [knownFor, setKnownFor] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(true);

  if (specialty === "Acting") {
    searchOption = "with_cast=";
  } else {
    searchOption = "with_crew=";
  }

  // Fetch de la liste de films en salle depuis l'API, stockage du tableau contenant cette liste dans le State "playing"
  useEffect(() => {
    fetch(
      `${urlDiscover}movie?include_adult=true&include_video=false&language=fr-FR&page=1&sort_by=vote_average.desc&sort_by=vote_count.desc&${searchOption}${id}`,
      options
    )
      .then((response) => {
        if (!response.ok) {
          setIsValid(false);
        }
        return response.json();
      })
      .then((data) => {
        setKnownFor(data.results);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
    return () => {};
  }, []);
  return (
    <>
      {isLoading && <p>Chargement en cours</p>}
      {!isValid && <h1>Aucun film correspondant</h1>}
      {isValid && !isLoading && (
        <Swiper
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
            1024: {
              width: 1024,
              slidesPerView: 4.5,
            },
          }}
          spaceBetween={25}
        >
          {knownFor.map((film) => (
            <SwiperSlide key={film.id}>
              <Link to={`/films/${film.id}`}>
                <img
                  className="rounded-lg"
                  src={
                    film.poster_path
                      ? `${urlImage}w200${film.poster_path}`
                      : pictureHolder
                  }
                  alt={film.title}
                />
                <p className="font-bold">{film.title}</p>
              </Link>
              <p>{giveDate(film.release_date)}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};
CarrouselKnownFor.propTypes = {
  specialty: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
export default CarrouselKnownFor;
