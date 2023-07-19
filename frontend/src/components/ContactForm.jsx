import React, { useState } from "react";

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleMessage = (e) => setMessage(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col m-4">
            <label htmlFor="firstname" className="ml-2">
              Prénom :
            </label>
            <input
              type="text"
              id="firstname"
              className="m-2 text-b2 rounded-md p-1"
              placeholder="Foo"
              value={firstName}
              onChange={handleFirstName}
              required
            />
          </div>
          <div className="flex flex-col m-4">
            <label htmlFor="lastname" className="ml-2">
              Nom de famille :
            </label>
            <input
              type="text"
              id="lastname"
              className="m-2 text-b2 rounded-md p-1"
              placeholder="Bar"
              value={lastName}
              onChange={handleLastName}
              required
            />
          </div>
          <div className="flex flex-col m-4">
            <label htmlFor="email" className="ml-2">
              Ton courriel :
            </label>
            <input
              type="email"
              id="email"
              className="m-2 text-b2 rounded-md p-1"
              placeholder="mail@codebakery.com"
              value={email}
              onChange={handleEmail}
              required
            />
          </div>
          <div className="flex flex-col m-4">
            <label htmlFor="message" className="ml-2">
              Message :
            </label>
            <textarea
              type="textarea"
              id="message"
              className="m-2 text-b2 rounded-md p-1"
              placeholder="On n'accepte que les compliments !"
              value={message}
              onChange={handleMessage}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-b2 hover:bg-b3 rounded-lg ml-6 my-4 px-5 py-2.5 text-center"
          >
            Envoyer le message
          </button>
          {showModal ? (
            <>
              <div className="justify-cente items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl text-b5 font-semibold">
                        Merci & Désolé
                      </h3>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <p className="my-4 text-b5 text-lg leading-relaxed">
                        {`Cher ${firstName} ${lastName}`}
                        <br />
                        {`Ton message: ${message}`}
                        <br />
                        ne nous sera pas transmis car notre backend est en
                        mousse !
                      </p>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-g2 rounded-b">
                      <button
                        className="bg-b5 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-50 fixed inset-0 z-40 bg-g1" />
            </>
          ) : null}
        </form>
      </div>
    </div>
  );
}
