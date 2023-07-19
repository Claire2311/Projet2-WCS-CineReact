import { useEffect } from "react";

import team from "../data/team.json";
import TeamCard from "../components/TeamCard";
import partners from "../data/partners.json";
import PartnerCard from "../components/PartnerCard";

export default function AboutUs() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="flex-grow flex justify-center text-b1">
      <div className="ml-5 max-w-7xl">
        <div className="text-4xl my-3">À propos de nous</div>
        <div>
          <h2 className="text-3xl mt-3">Notre projet</h2>
          <p className="text-xl mt-1">
            Actuellement étudiants à la Wild Code School dans une formation de
            Développeur Web & Web Mobile spécialisée en JavaScript/React, <br />
            nous sommes en train de réaliser notre premier projet sur React,
            comme vous l'aurez probablement reconnu ce site est un clone de
            <a href="https://www.themoviedb.org/"> TMDB.org</a> qui a pour
            objectif :
          </p>
          <ul className="text-xl ml-5 mt-1 list-disc">
            <li>
              De vous permettre de trouver des infos pertinentes sur les
              dernières sorties cinématographiques
            </li>
            <li>De nous permettre de mieux comprendre les rouages de React</li>
            <li>D'utiliser la méthode Agile : SCRUM</li>
            <li>
              De nous amuser en testant de nouvelles technos comme Tailwind
            </li>
          </ul>
        </div>
        <div>
          <h2 className="flex md:justify-start justify-center text-3xl mt-6 mb-4">
            Notre équipe
          </h2>
          <div className="flex flex-wrap md:justify-start justify-center gap-5 mt-1">
            {team.map((member) => (
              <TeamCard
                key={member.id}
                firstName={member.firstname}
                lastName={member.lastname}
                pic={member.picture}
                quote={member.quote}
                url={member.url}
              />
            ))}
          </div>
          <p className="my-2">Avec la participation de Michael Aura</p>
        </div>

        <div>
          <h2 className="text-3xl flex md:justify-start justify-center mt-6 mb-4">
            Nos partenaires
          </h2>
          <div className="flex flex-wrap md:justify-start justify-center gap-5 mt-1 ">
            {partners.map((partner) => (
              <PartnerCard
                key={partner.id}
                name={partner.name}
                desc={partner.desc}
                pic={partner.picture}
                url={partner.url}
              />
            ))}
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-2 items-center text-3xl mt-6 mb-4">
          {`Support = ( team, project ) =>`}
          <a href="https://www.paypal.com/donate/?hosted_button_id=C54JJPAZSEW5E">
            <img
              src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
              alt="Bouton paypal"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
