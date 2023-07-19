import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import giveDate from "../services/giveDate";

import pictureHolder from "../assets/picture-holder.png";

const tmdbUrlImage = import.meta.env.VITE_TMDB_URL_IMAGE;

function MediaCard({ id, title, releaseDate, overview, posterPath, media }) {
  return (
    <div>
      <Link className="text-2xl" to={`/${media}/${id}`}>
        <div
          href="#"
          className="flex md:flex-col flex-row border border-g2 rounded-lg shadow mx-2 my-2.5  md:w-36"
        >
          <img
            className="md:rounded-none md:rounded-t-lg rounded-l-lg h-36 md:w-48 w-24 md:h-auto "
            src={
              posterPath
                ? `${tmdbUrlImage}original${posterPath}`
                : pictureHolder
            }
            alt={title}
          />
          <div className="flex flex-col p-3 pt-4 h-24">
            <p className="text-sm text-left font-bold ">{title}</p>
            <p className="text-sm text-left mb-3 text-g1">
              {giveDate(releaseDate)}
            </p>
            <p className="text-sm text-left mb-1 md:hidden">{`${overview.slice(
              0,
              66
            )}...`}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MediaCard;

MediaCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  posterPath: PropTypes.string.isRequired,
  media: PropTypes.string.isRequired,
};
