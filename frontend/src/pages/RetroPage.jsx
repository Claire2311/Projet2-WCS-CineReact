import { useEffect } from "react";
import { useParams } from "react-router-dom";

import FilmCardRetro from "../components/FilmCardRetro";
import clock from "../assets/clock.png";

function RetroPage() {
  const { year } = useParams();

  const youngAge1 = parseInt(year, 10) + 5;
  const youngAge2 = parseInt(year, 10) + 10;
  const teenAge1 = parseInt(year, 10) + 15;
  const teenAge2 = parseInt(year, 10) + 17;
  const teenAge3 = parseInt(year, 10) + 18;
  const adultAge1 = parseInt(year, 10) + 23;
  const adultAge2 = parseInt(year, 10) + 36;
  const adultAge3 = parseInt(year, 10) + 40;

  const todayYear = new Date().getFullYear();

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <main className="bg-[url('./assets/moviePictureTransparent.png')] bg-cover flex justify-center flex-grow">
      <div className="text-2xl max-w-7xl mx-2">
        <h2 className="text-3xl font-bold my-8">Rétrospective</h2>
        <h3>Tu es né(e) en {year}...</h3>
        {todayYear - youngAge1 < 0 && (
          <p className="mt-8">
            Reviens quand tu seras plus âgé pour avoir la suite ;-)
          </p>
        )}
        <div className="border-l-2 border-l-black pl-6 ml-4">
          {todayYear - youngAge1 >= 0 && (
            <div>
              <p className="font-bold mt-8">Tes films de jeunesse</p>
              <img
                className="w-10 relative right-11 bottom-8"
                src={clock}
                alt="nothing"
              />
            </div>
          )}
          <div className="flex justify-center flex-wrap">
            {todayYear - youngAge1 >= 0 && (
              <FilmCardRetro year={youngAge1} genre="10751" />
            )}
            {todayYear - youngAge2 >= 0 && (
              <FilmCardRetro year={youngAge2} genre="10751" />
            )}
          </div>
          {todayYear - teenAge1 >= 0 && (
            <div>
              <p className="font-bold mt-8">
                Tes premiers films d'actions entre amis
              </p>
              <img
                className="w-10 relative right-11 bottom-12 md:bottom-8"
                src={clock}
                alt="nothing"
              />
            </div>
          )}
          <div className="flex justify-center flex-wrap">
            {todayYear - teenAge1 >= 0 && (
              <FilmCardRetro year={teenAge1} genre="28" />
            )}
            {todayYear - teenAge2 >= 0 && (
              <FilmCardRetro year={teenAge2} genre="27" />
            )}
          </div>
          {todayYear - teenAge3 >= 0 && (
            <div>
              <p className="font-bold mt-8">Ton premier film en amoureux</p>
              <img
                className="w-10 relative right-11 bottom-8"
                src={clock}
                alt="nothing"
              />
              <div className="flex justify-center">
                <FilmCardRetro year={teenAge3} genre="10749" />
              </div>
            </div>
          )}
          {todayYear - adultAge1 >= 0 && (
            <div>
              <p className="font-bold mt-8">
                Tu es majeur(e), bienvenue dans le futur
              </p>
              <img
                className="w-10 relative right-11 bottom-12 md:bottom-8"
                src={clock}
                alt="nothing"
              />
              <div className="flex justify-center">
                <FilmCardRetro year={adultAge1} genre="878" />
              </div>
            </div>
          )}

          {todayYear - adultAge2 >= 0 && (
            <div>
              <p className="font-bold mt-8">
                Tu redécouvres les films familiaux avec tes enfants, neveux,
                nièces,...
              </p>
              <img
                className="w-10 relative right-11 bottom-16 md:bottom-8"
                src={clock}
                alt="nothing"
              />
              <div className="flex justify-center">
                <FilmCardRetro year={adultAge2} genre="10751" />
              </div>
            </div>
          )}
          {todayYear - adultAge3 >= 0 && (
            <div>
              <p className="font-bold mt-8">
                Tu n'as plus l’âge de regarder des films : tu te documentes
              </p>
              <img
                className="w-10 relative right-11 bottom-12 md:bottom-8"
                src={clock}
                alt="nothing"
              />
              <div className="flex justify-center">
                <FilmCardRetro year={adultAge3} genre="99" />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default RetroPage;
