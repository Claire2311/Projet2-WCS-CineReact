import { useState } from "react";
import PropTypes from "prop-types";

function Retro({ shownRetro, setShownRetro, yearOfBirth, setYearOfBirth }) {
  const [showModal, setShowModal] = useState(false);
  const date = new Date();

  const handleYearOfBirth = (event) => {
    setYearOfBirth(event.target.value);
  };

  const controlYear = (e) => {
    e.preventDefault();
    if (
      Number.isNaN(parseInt(yearOfBirth, 10)) ||
      parseInt(yearOfBirth, 10) < 1900 ||
      parseInt(yearOfBirth, 10) > date.getFullYear()
    ) {
      setShowModal(true);
    } else {
      setShownRetro(!shownRetro);
    }
  };

  return (
    <div>
      <div className="w-5/6 flex mx-auto max-h-96 max-w-4xl my-6">
        <div className="">
          <div className="bg-[url('./assets/PopCorn.png')] bg-cover h-96 rounded-lg">
            <p className="text-white text-2xl font-bold pt-6 mb-10 mx-2.5 md:pt-10 md:text-3xl md:px-4 lg:pt-12 lg:px-6 lg:mb-16">
              Envie de connaitre le film qui a cartonné l’année de ta naissance
              ?
            </p>

            <p className="text-xl text-white text-center mb-8">
              Renseigne ton année de naissance :
            </p>
            <form className="flex flex-col">
              <input
                className="bg-gray-50 text-gray-900 text-sm rounded-md p-2 w-32 text-center mx-auto mb-8"
                id="yearOfBirth"
                type="text"
                minLength="4"
                maxLength="4"
                placeholder="0000"
                value={yearOfBirth}
                onChange={handleYearOfBirth}
              />
              <button
                type="submit"
                className="text-white bg-b1 rounded-lg text-md py-2 w-20 mx-auto"
                onClick={controlYear}
              >
                Mon film
              </button>
            </form>
          </div>
        </div>
      </div>
      <div>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 rounded-t">
                    <h3 className="text-3xl text-b5 font-semibold">
                      Attention
                    </h3>
                  </div>

                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-b5 text-lg leading-relaxed">
                      Merci de renseigner une année sous format YYYY et entre
                      les années 1900 et {date.getFullYear()}
                    </p>
                  </div>

                  <div className="flex items-center justify-end p-6 rounded-b">
                    <button
                      className="bg-b5 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-g1" />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Retro;

Retro.propTypes = {
  shownRetro: PropTypes.bool.isRequired,
  setShownRetro: PropTypes.func.isRequired,
  yearOfBirth: PropTypes.string.isRequired,
  setYearOfBirth: PropTypes.func.isRequired,
};
