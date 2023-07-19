import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
// A l'heure actuelle, je ne sais pas comment me débarasser de l'import de swiper/css sans casser l'affichage du carrousel
import "swiper/css";
import pictureHolder from "../assets/picture-holder.png";
// Déclaration des constantes de variables d'environnement
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const url = import.meta.env.VITE_TMDB_URL;
const urlImage = import.meta.env.VITE_TMDB_URL_IMAGE;
// Déclaration des options de fetch sur l'API
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};
function CarrouselRecommandation({ id, section, name, mediaLink, genres }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [recommande, setRecommande] = useState([]);
  // Fetch de la liste de films en salle depuis l'API, stockage du tableau contenant cette liste dans le State "playing"

  useEffect(() => {
    fetch(
      `${url}${section}/${id}/recommendations?language=fr-FR&page=1`,
      options
    )
      .then((response) => {
        if (!response.ok) setIsValid(false);
        return response.json();
      })
      .then((data) => {
        setRecommande(data.results);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);
  const compareGenres = (array) =>
    genres.map((elem) => {
      return array.genre_ids.includes(elem.id);
    });

  return (
    <>
      <h3 className="my-2 text-2xl font-semibold">{`Si vous avez aimé ${name}, vous apprécierez certainement : `}</h3>
      {!isValid && <p>ID invalide</p>}
      {isLoading && <p>Chargment en cours</p>}
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
          }}
          spaceBetween={25}
        >
          {recommande.map(
            (film) =>
              compareGenres(film).includes(true) && (
                <SwiperSlide key={film.id}>
                  <Link to={`/${mediaLink}/${film.id}`}>
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
                </SwiperSlide>
              )
          )}
        </Swiper>
      )}
    </>
  );
}

CarrouselRecommandation.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  mediaLink: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default CarrouselRecommandation;
