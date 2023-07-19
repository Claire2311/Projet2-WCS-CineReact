import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CarrouselCasting from "../components/CarrouselCasting";
import CarrouselRecommandation from "../components/CarrouselRecommendation";
import translateStatus from "../services/translateStatus";
import translateLanguages from "../services/translateLanguages";

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbUrlMovie = import.meta.env.VITE_TMDB_URL_MOVIE;
const tmdbUrlImage = import.meta.env.VITE_TMDB_URL_IMAGE;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${tmdbApiKey}`,
  },
};

const reverseDate = (str) => str.split("-").reverse().join("-");

const convertTime = (num) => {
  const h = Math.floor(num / 60);
  const m = num % 60;
  return `${h}h ${m}m`;
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

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function Film() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    fetch(`${tmdbUrlMovie}${id}?language=fr-FR`, options)
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
    <main className="flex justify-center text-xl bg-white">
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
            <div className="md:mx-2">
              <div className="w-full flex flex-wrap justify-center items-end gap-4 md:rounded-t-xl bg-g2  py-2">
                <div className="text-3xl font-semibold">{data.title}</div>
                <div>
                  {data.release_date
                    ? `(${parseInt(data.release_date, 10)})`
                    : "-"}
                </div>
              </div>
              <div className="w-full flex flex-wrap justify-center bg-g1  py-2">
                <div className="mx-3">
                  {data.release_date ? reverseDate(data.release_date) : "-"}
                </div>
                <div>ꞏ</div>
                <div className="mx-3">
                  {data.runtime ? convertTime(data.runtime) : "-"}
                </div>

                <div className="mx-3">
                  {data.genres ? getGenres(data.genres) : "-"}
                </div>
              </div>
              <div className="bg-g2 px-4 md:rounded-b-xl">
                <div className="text-xl text-g1 py-1.5">
                  {data.tagline ? data.tagline : "-"}
                </div>
                <div className="text-2xl font-semibold">Synopsis</div>
                <div className=" pb-4">
                  {data.overview ? data.overview : "-"}
                </div>
              </div>
            </div>
            <div className="w-full pl-2 mb-6">
              <CarrouselCasting id={data.id} section="movie" />
            </div>
            <div className="w-full pl-2">
              <CarrouselRecommandation
                id={data.id}
                name={data.title}
                genres={data.genres}
                section="movie"
                mediaLink="films"
              />
            </div>
            <div className="w-full flex flex-col justify-evenly pb-4 pl-2">
              <div className="my-1">
                <div className="font-semibold">Statut :</div>
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
              <div className="my-1">
                <div className="font-semibold">Budget :</div>
                <div>{data.budget ? formatter.format(data.budget) : `-`}</div>
              </div>
              <div className="my-1">
                <div className="font-semibold">Recettes :</div>
                <div>{data.revenue ? formatter.format(data.revenue) : `-`}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
