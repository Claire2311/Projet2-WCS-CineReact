import PropTypes from "prop-types";
import { useState } from "react";

const convertTime = (num) => {
  const h = Math.floor(num / 60);
  const m = num % 60;
  if (h === 0) {
    return `${m}m`;
  }
  return `${h}h ${m}m`;
};

function EpisodeCard({ title, overview, date, runtime, image, number }) {
  const [moreOverview, setMoreOverview] = useState(false);

  const handleShowMore = (e) => {
    e.preventDefault();
    setMoreOverview(!moreOverview);
  };

  return (
    <div className="flex flex-col border border-g2 rounded-lg shadow mx-2 my-4 w-80">
      <div>
        <img
          className="rounded-t-lg"
          src={`https://www.themoviedb.org/t/p/w640_and_h360_bestv2${image}`}
          alt={`Episode ${number}`}
        />
      </div>
      <div className="p-2">
        <p className="font-bold text-xl">
          {number}. {title}
        </p>
        {overview.length < 150 && <p>{overview}</p>}
        {overview.length >= 150 && (
          <div>
            <div>
              {!moreOverview ? (
                <p>{overview.slice(0, 150)}...</p>
              ) : (
                <p>{overview}</p>
              )}
            </div>
            <button
              type="button"
              className="w-full  font-bold flex justify-end"
              onClick={handleShowMore}
            >
              {!moreOverview ? "Afficher plus" : "Afficher moins"}
            </button>
          </div>
        )}

        <div className="text-sm text-g1 flex flex-col">
          <p className="flex justify-end">
            {new Date(date).toLocaleDateString()}
          </p>
          <p className="flex justify-end">{convertTime(runtime)}</p>
        </div>
      </div>
    </div>
  );
}

export default EpisodeCard;

EpisodeCard.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  runtime: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};
