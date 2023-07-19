import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { PropTypes } from "prop-types";
import "swiper/css";

import getGender from "../services/getGender";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbUrl = import.meta.env.VITE_TMDB_URL;
const urlImage = import.meta.env.VITE_TMDB_URL_IMAGE;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};

function CarrouselCasting({ id, section }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${tmdbUrl}${section}/${id}/credits?language=fr-FR`, options)
      .then((res) => {
        if (!res.ok) setIsValid(false);
        return res.json();
      })
      .then((resjson) => {
        setData(resjson);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <>
      <h3 className="my-2 text-2xl font-semibold">Têtes d'affiche</h3>
      {!isValid && <p>ID invalide</p>}
      {isLoading && <p>Chargment en cours</p>}
      {isValid && !isLoading && (
        <Swiper
          breakpoints={{
            0: { width: 500, slidesPerView: 2 },
            640: { width: 640, slidesPerView: 2.5 },
            768: { width: 768, slidesPerView: 3.5 },
          }}
          spaceBetween={25}
        >
          {data.cast.map((actor) => (
            <SwiperSlide key={actor.id}>
              <Link to={`/artists/${actor.id}`}>
                <img
                  className="rounded-lg"
                  src={
                    actor.profile_path
                      ? `${urlImage}w200${actor.profile_path}`
                      : getGender(actor)
                  }
                  alt={actor.name}
                />
                <p className="font-semibold">{actor.name}</p>
                <p className="text-g1">{actor.character}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

CarrouselCasting.propTypes = {
  id: PropTypes.number.isRequired,
  section: PropTypes.string.isRequired,
};

export default CarrouselCasting;
