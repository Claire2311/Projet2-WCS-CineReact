import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function TeamCard({ firstName, lastName, pic, quote, url }) {
  return (
    <div className="bg-b2 w-48 text-white rounded-md">
      <Link to={url}>
        <img
          className="rounded-t-md h-48"
          src={pic}
          alt={`${firstName} ${lastName} profile`}
        />
        <p className="text-xl mx-2">
          {firstName} {lastName}
        </p>
      </Link>
      <p className="mx-2 mb-2">{quote}</p>
    </div>
  );
}

TeamCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  pic: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
