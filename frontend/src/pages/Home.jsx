import { useState } from "react";

import Retro from "../components/Retro";
import RetroMovie from "../components/RetroMovie";

import EnSalle from "../components/EnSalle";
import Top20 from "../components/Top20";
import Header from "../components/Header";

export default function Home() {
  const [shownRetro, setShownRetro] = useState(false);
  const [yearOfBirth, setYearOfBirth] = useState("");

  const setScrollPosition = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "instant",
    });
  };

  return (
    <main className="bg-white">
      <div className="flex justify-center">
        <div className="max-w-7xl w-full">
          <Header />
          <EnSalle />
          <Top20 />
          <div>
            {!shownRetro && (
              <Retro
                shownRetro={shownRetro}
                setShownRetro={setShownRetro}
                yearOfBirth={yearOfBirth}
                setYearOfBirth={setYearOfBirth}
                setScrollPosition={setScrollPosition}
              />
            )}
          </div>
          <div>
            {shownRetro && (
              <RetroMovie
                shownRetro={shownRetro}
                setShownRetro={setShownRetro}
                yearOfBirth={yearOfBirth}
                setYearOfBirth={setYearOfBirth}
                setScrollPosition={setScrollPosition}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
