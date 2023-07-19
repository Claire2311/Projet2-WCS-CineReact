import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function PartnerCard({ name, desc, pic, url }) {
  return (
    <div className="flex flex-col bg-b2 w-48 text-white rounded-md">
      <Link to={url}>
        <img className="rounded-t-md" src={pic} alt={`${name} site logo`} />
        <p className="text-xl mx-2">{name}</p>
      </Link>
      <p className="mx-2 mb-2">{desc}</p>
    </div>
  );
}

PartnerCard.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  pic: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
