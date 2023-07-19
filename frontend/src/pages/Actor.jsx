import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CarrouselKnownFor from "../components/CarrouselKnownFor";
import ActorJobs from "../components/ActorJobs";
import giveDate from "../services/giveDate";
import translateGender from "../services/translateGender";
import translateDepartment from "../services/translateDepartment";

import getGender from "../services/getGender";

// Déclaration des variables d'environnement
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const urlActor = import.meta.env.VITE_TMDB_URL_ACTOR;
const urlImage = import.meta.env.VITE_TMDB_URL_IMAGE;

// Déclaration des options de fetch sur l'API
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};

export default function Actor() {
  const [currentActor, setCurrentActor] = useState({});
  const [currentActorCast, setCurrentActorCast] = useState([]);
  const [currentActorCrew, setCurrentActorCrew] = useState([]);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isValid1, setIsValid1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isValid2, setIsValid2] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    // Fetch de l'api pour récupérer le tableau currentActor contenant les informations générales de l'acteur dont l'id est égal à celui de l'URL
    let isCancelled = false;
    fetch(`${urlActor}${id}?language=fr-FR`, options)
      .then((response) => {
        if (!response.ok) {
          setIsValid1(false);
        }
        return response.json();
      })
      .then((data) => {
        if (!isCancelled) {
          setCurrentActor(data);
          setIsLoading1(false);
        }
      })
      .catch((err) => console.error(err));
    // Fetch de l'api pour récupérer l'objet currentActorCast contenant le tableau cast qui liste les films dans lesquels l'acteur a joué, et le tableau crew qui liste les films pour lesquels l'acteur a participé à la réalisation
    fetch(`${urlActor}${id}/movie_credits?language=fr-FR`, options)
      .then((response) => {
        if (!response.ok) {
          setIsValid2(false);
        }
        return response.json();
      })
      .then((res) => {
        setCurrentActorCast(res.cast);
        setCurrentActorCrew(res.crew);
        setIsLoading2(false);
      })
      .catch((err) => console.error(err));
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <main className="flex justify-center bg-white">
      {isLoading1 && isLoading2 && <h1>Chargement en cours</h1>}
      {!isValid1 && !isValid2 && <h1>Aucun acteur correspondant</h1>}
      {isValid1 && isValid2 && !isLoading1 && !isLoading2 && (
        <div className="max-w-7xl w-full flex md:flex-row md:justify-around flex-col">
          <div className="flex flex-col md:max-w-xs w-full md:ml-2">
            <img
              className="rounded-lg md:self-auto self-center mt-4"
              src={
                currentActor.profile_path
                  ? `${urlImage}w200${currentActor.profile_path}`
                  : getGender(currentActor)
              }
              alt={currentActor.name}
            />
            <h2 className="font-bold text-3xl mt-4 md:self-auto self-center md:hidden">
              {currentActor.name}
            </h2>

            <div className="border-b1 md:pl-0 pl-4">
              <h3 className="font-bold text-xl mt-4 mb-5">
                Informations personnelles
              </h3>
              <ul className="">
                <li>
                  <h4 className="font-semibold">Célèbre pour</h4>
                  <p>
                    {translateDepartment(currentActor.known_for_department)}
                  </p>
                </li>
                <li>
                  <h4 className="font-semibold">Genre</h4>
                  <p>{translateGender(currentActor.gender)}</p>
                </li>
                <li>
                  <h4 className="font-semibold">Date de naissance</h4>
                  <p>{giveDate(currentActor.birthday)}</p>
                </li>
                <li>
                  <h4 className="font-semibold">Lieu de naissance</h4>
                  <p>
                    {currentActor.place_of_birth
                      ? currentActor.place_of_birth
                      : "Non renseigné"}
                  </p>
                </li>
                {currentActor.deathday && (
                  <li>
                    <h4 className="font-semibold">Date de décès</h4>
                    <p>{giveDate(currentActor.deathday)}</p>
                  </li>
                )}
                {currentActorCast.length !== 0 && (
                  <li>
                    <h4 className="font-semibold">Nombre de rôles</h4>
                    <p>{currentActorCast.length}</p>
                  </li>
                )}
                {currentActorCrew.length !== 0 && (
                  <li>
                    <h4 className="font-semibold">
                      Participations à la réalisation
                    </h4>
                    <p>{currentActorCrew.length}</p>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:max-w-xl lg:max-w-4xl">
            <h2 className="font-bold text-3xl m-8 md:block hidden">
              {currentActor.name}
            </h2>
            {currentActor.biography && (
              <div className="mt-8 m-3 p-3 border border-g2 rounded-lg shadow ">
                <h3 className="font-bold text-xl mb-3">Biographie</h3>
                <p>{currentActor.biography}</p>
              </div>
            )}
            <div className="mt-8 m-3">
              <h3 className="font-bold text-xl mb-3">Célèbre pour</h3>
              <div className="w-full">
                {currentActor && (
                  <CarrouselKnownFor
                    specialty={currentActor.known_for_department}
                    id={id}
                  />
                )}
              </div>
            </div>
            <ActorJobs
              currentActorCast={currentActorCast}
              currentActorCrew={currentActorCrew}
            />
          </div>
        </div>
      )}
    </main>
  );
}

// grid grid-cols-2 gap-4 md:grid-cols-1
