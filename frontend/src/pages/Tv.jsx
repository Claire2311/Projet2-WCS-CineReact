import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import CarrouselCasting from "../components/CarrouselCasting";
import CarrouselRecommandation from "../components/CarrouselRecommendation";
import translateStatus from "../services/translateStatus";
import translateLanguages from "../services/translateLanguages";

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbUrl = import.meta.env.VITE_TMDB_URL;
const tmdbUrlImage = import.meta.env.VITE_TMDB_URL_IMAGE;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${tmdbApiKey}`,
  },
};

const getGenres = (data) => {
  const genreList = [];
  data.map((genre) => genreList.push(genre.name));
  return genreList.join(", ");
};

const getLanguages = (data) => {
  const languagesList = [];
  data.map((language) => languagesList.push(language.english_name));
  return languagesList.join(", ");
};

export default function Tv() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    fetch(`${tmdbUrl}tv/${id}?language=fr-FR`, options)
      .then((response) => {
        if (!response.ok) setIsValid(false);
        return response.json();
      })
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));

    window.scrollTo(0, 0);
  }, [id]);

  return (
    <main className="bg-white flex justify-center text-xl ">
      <div className="max-w-7xl w-full flex flex-col items-center">
        {isLoading && <h3>Chargement en cours</h3>}
        {!isValid && <h3>Aucun film correspondant</h3>}
        {isValid && !isLoading && (
          <>
            <div
              className="relative bg-cover w-full lg:rounded-2xl m-2"
              style={{
                backgroundImage: `url('${tmdbUrlImage}original${data.backdrop_path}')`,
              }}
            >
              <img
                className="h-[25rem] rounded-2xl lg:m-20 md:mx-10 mx-2 my-10"
                src={`${tmdbUrlImage}original${data.poster_path}`}
                alt="jackett"
              />
            </div>
            <div className="w-full flex flex-wrap justify-center items-end gap-4 bg-g2 py-2 md:rounded-lg md:m-2">
              <div className="text-3xl font-semibold">{data.name}</div>
              <div>
                {data.first_air_date
                  ? `(${parseInt(data.first_air_date, 10)})`
                  : "-"}
              </div>
            </div>
            <div className="w-full flex flex-wrap justify-center bg-g1 p-2 md:rounded-lg md:m-2">
              <div className="mx-3">
                {data.genres ? getGenres(data.genres) : "-"}
              </div>
            </div>
            <div className="bg-g2 w-full px-4 py-2 md:rounded-lg">
              <div className="text-xl text-g1 py-1.5">
                {data.tagline ? data.tagline : "-"}
              </div>
              <div className="text-2xl font-semibold">Synopsis</div>
              <div className=" pb-4">{data.overview ? data.overview : "-"}</div>
              <div className="text-2xl font-semibold">Crée par :</div>
              <Link to={`/artists/${data.created_by[0]?.id}`}>
                <div className=" pb-4">
                  {data.created_by[0]?.name ? data.created_by[0].name : "-"}
                </div>
              </Link>
            </div>
            <div className="w-full md:pl-0 pl-4">
              <CarrouselCasting id={data.id} section="tv" />
            </div>
            <div className="w-full flex gap-10 p-4">
              <div className="my-1">
                <div className="font-semibold">Status:</div>
                <div>{data.status ? translateStatus(data.status) : "-"}</div>
              </div>
              <div className="my-1">
                <div className="font-semibold">Langue d'origine :</div>
                <div>
                  {data.spoken_languages
                    ? translateLanguages(getLanguages(data.spoken_languages))
                    : "-"}
                </div>
              </div>
            </div>
            <div className="w-full">
              <h3 className="text-2xl px-4 font-semibold">Liste des saisons</h3>
              <div className="md:mx-0 mx-2">
                {data.seasons.toReversed().map((season) => (
                  <div
                    key={season.id}
                    className="collapse collapse-plus bg-g2 my-2 border-b-2 border-b-g1"
                  >
                    <input type="checkbox" />
                    <h4 className="collapse-title bg-g2 my-2 border-b-2 border-b-g1">
                      {season.name}
                    </h4>
                    <div className="collapse-content flex flex-col">
                      <div>
                        {season.overview.length ? season.overview : "-"}
                      </div>
                      <div className="bg-gradient-to-r from-b1 to-b2 text-white w-32 my-2 p-2 rounded-lg text-center">
                        <Link
                          to={`/tv/${data.id}/seasons/${season.season_number}`}
                        >
                          En savoir plus
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full pl-2 pb-4">
              <CarrouselRecommandation
                id={data.id}
                name={data.name}
                section="tv"
                mediaLink="tv"
                genres={data.genres}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
