import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="flex text-white bg-gradient-to-r from-b2 to-b1 py-4 justify-center">
      <div className="w-full max-w-7xl">
        <div className="flex w-full justify-between items-center">
          <div className="text-xl">
            <ul className="ml-4">
              <li className="my-4">
                <Link to="/aboutus">À propos</Link>
              </li>
              <li className="my-4">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-lg mr-4">©2023 CinéReact</p>
          </div>
        </div>
      </div>
    </div>
  );
}
