import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useState, useEffect } from "react";

import sortActingJobs from "../services/sortActingJobs";
import giveJobs from "../services/giveJobs";

export default function ActorJobs({ currentActorCast, currentActorCrew }) {
  const [isLoading, setIsLoading] = useState(true);
  const [actingJobs, setActingJobs] = useState([]);
  const [directingJobs, setDirectingJobs] = useState([]);
  const [writingJobs, setWritingJobs] = useState([]);
  const [soundJobs, setSoundJobs] = useState([]);
  const [productionJobs, setProductionJobs] = useState([]);
  const [artJobs, setArtJobs] = useState([]);
  const [visualJobs, setVisualJobs] = useState([]);
  const [editingJobs, setEditingJobs] = useState([]);
  const [crewJobs, setCrewJobs] = useState([]);
  const [cameraJobs, setCameraJobs] = useState([]);
  const [costumeJobs, setCostumeJobs] = useState([]);

  useEffect(() => {
    setActingJobs(sortActingJobs(currentActorCast));
    setDirectingJobs(giveJobs(currentActorCrew, "directing"));
    setWritingJobs(giveJobs(currentActorCrew, "writing"));
    setSoundJobs(giveJobs(currentActorCrew, "sound"));
    setProductionJobs(giveJobs(currentActorCrew, "production"));
    setArtJobs(giveJobs(currentActorCrew, "art"));
    setVisualJobs(giveJobs(currentActorCrew, "visual effects"));
    setEditingJobs(giveJobs(currentActorCrew, "editing"));
    setCrewJobs(giveJobs(currentActorCrew, "crew"));
    setCameraJobs(giveJobs(currentActorCrew, "camera"));
    setCostumeJobs(giveJobs(currentActorCrew, "costume & make-up"));
    setIsLoading(false);
  }, []);

  return (
    <div className="divide-y-2 divide-g2">
      {isLoading && <p>Chargement en cours</p>}
      {!isLoading && (
        <>
          {actingJobs.length !== 0 && (
            <div className="my-8 m-3 ">
              <p className="font-bold text-xl mb-3 pt-8 ">Interprétations</p>
              {actingJobs.map((film) => (
                <div className="my-3 flex" key={film.id}>
                  <p className="w-9 font-bold ">
                    {film.release_date ? film.release_date.slice(0, 4) : " - "}
                  </p>
                  <div>
                    <Link to={`/films/${film.id}`}>
                      <p className="font-bold mx-5">{film.title}</p>
                    </Link>
                    <p className="mx-5 px-5 py-1">
                      {film.character
                        ? film.character
                        : "Rôle inconnu / anonyme"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {directingJobs.length !== 0 && (
            <div className="mt-8 m-3 pt-8">
              <p className=" font-bold text-xl mb-3">Réalisation</p>
              {directingJobs.map((film) => (
                <div className="my-3 flex" key={film.id}>
                  <p className="w-9 font-bold">
                    {film.release_date ? film.release_date.slice(0, 4) : " - "}
                  </p>
                  <div>
                    <Link to={`/films/${film.id}`}>
                      <p className="font-bold mx-5">{film.title}</p>
                    </Link>
                    <p className="mx-5 px-5 py-1">{film.job}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {writingJobs.length !== 0 && (
            <div className="mt-8 m-3 pt-8">
              <p className="font-bold text-xl mb-3">Ecriture</p>
              {writingJobs.map((film) => (
                <div className="my-3 flex" key={film.id}>
                  <p className="w-9 font-bold">
                    {film.release_date ? film.release_date.slice(0, 4) : " - "}
                  </p>
                  <div>
                    <Link to={`/films/${film.id}`}>
                      <p className="font-bold mx-5">{film.title}</p>
                    </Link>
                    <p className="mx-5  px-5 py-1">{film.job}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {soundJobs.length !== 0 && (
            <div className="mt-8 m-3 pt-8">
              <p className="font-bold text-xl mb-3">Composition</p>
              {soundJobs.map((film) => (
                <div className="my-3 flex" key={film.id}>
                  <p className="w-9 font-bold">
                    {film.release_date ? film.release_date.slice(0, 4) : " - "}
                  </p>
                  <div>
                    <Link to={`/films/${film.id}`}>
                      <p className="font-bold mx-5">{film.title}</p>
                    </Link>
                    <p className="mx-5 px-5 py-1">{film.job}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {productionJobs.length !== 0 && (
            <div className="mt-8 m-3 pt-8">
              <p className="font-bold text-xl mb-3">Production</p>
              {productionJobs.map((film) => (
                <div className="my-3 flex" key={film.id}>
                  <p className="w-9 font-bold">
                    {film.release_date ? film.release_date.slice(0, 4) : " - "}
                  </p>
                  <div>
                    <Link to={`/films/${film.id}`}>
                      <p className="font-bold mx-5">{film.title}</p>
                    </Link>
                    <p className="mx-5 px-5 py-1">{film.job}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {artJobs.length !== 0 && (
            <div className="mt-8 m-3 pt-8">
              <p className="font-bold text-xl mb-3">Direction artistique</p>
              {artJobs.map((film) => (
                <div className="my-3 flex" key={film.id}>
                  <p className="w-9 font-bold">
                    {film.release_date ? film.release_date.slice(0, 4) : " - "}
                  </p>
                  <div>
                    <Link to={`/films/${film.id}`}>
                      <p className="font-bold mx-5">{film.title}</p>
                    </Link>
                    <p className="mx-5 px-5 py-1"> {film.job}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {visualJobs.length !== 0 && (
            <div className="mt-8 m-3 pt-8">
              <p className="font-bold text-xl mb-3">Effets visuels</p>
              {visualJobs.map((film) => (
                <div className="my-3 flex" key={film.id}>
                  <p className="w-9 font-bold">
                    {film.release_date ? film.release_date.slice(0, 4) : " - "}
                  </p>
                  <div>
                    <Link to={`/films/${film.id}`}>
                      <p className="font-bold mx-5">{film.title}</p>
                    </Link>
                    <p className="mx-5 px-5 py-1">{film.job}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {editingJobs.length !== 0 && (
            <div className="mt-8 m-3 pt-8">
              <p className="font-bold text-xl mb-3">Montage</p>
              {editingJobs.map((film) => (
                <div className="my-3 flex" key={film.id}>
                  <p className="w-9 font-bold">
                    {film.release_date ? film.release_date.slice(0, 4) : " - "}
                  </p>
                  <div>
                    <Link to={`/films/${film.id}`}>
                      <p className="font-bold mx-5">{film.title}</p>
                    </Link>
                    <p className="mx-5 px-5 py-1">{film.job}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {crewJobs.length !== 0 && (
            <div className="mt-8 m-3 pt-8">
              <p className="font-bold text-xl mb-3">Equipe technique</p>
              {crewJobs.map((film) => (
                <div className="my-3 flex" key={film.id}>
                  <p className="w-9 font-bold">
                    {film.release_date ? film.release_date.slice(0, 4) : " - "}
                  </p>
                  <div>
                    <Link to={`/films/${film.id}`}>
                      <p className="font-bold mx-5">{film.title}</p>
                    </Link>
                    <p className="mx-5 px-5 py-1">{film.job}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {cameraJobs.length !== 0 && (
            <div className="mt-8 m-3 pt-8">
              <p className="font-bold text-xl mb-3">Photographie</p>
              {cameraJobs.map((film) => (
                <div className="my-3 flex" key={film.id}>
                  <p className="w-9 font-bold">
                    {film.release_date ? film.release_date.slice(0, 4) : " - "}
                  </p>
                  <div>
                    <Link to={`/films/${film.id}`}>
                      <p className="font-bold mx-5">{film.title}</p>
                    </Link>
                    <p className="mx-5 px-5 py-1">{film.job}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {costumeJobs.length !== 0 && (
            <div className="mt-8 m-3 pt-8">
              <p className="font-bold text-xl mb-3">Costumes et maquillage</p>
              {costumeJobs.map((film) => (
                <div className="my-3 flex" key={film.id}>
                  <p className="w-9 font-bold">
                    {film.release_date ? film.release_date.slice(0, 4) : " - "}
                  </p>
                  <div>
                    <Link to={`/films/${film.id}`}>
                      <p className="font-bold mx-5">{film.title}</p>
                    </Link>
                    <p className="mx-5 px-5 py-1">{film.job}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
ActorJobs.propTypes = {
  currentActorCast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      release_date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  currentActorCrew: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      release_date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      job: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
