import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Films from "../pages/Films";
import Film from "../pages/Film";
import Actors from "../pages/Actors";
import Actor from "../pages/Actor";
import Tvs from "../pages/Tvs";
import Tv from "../pages/Tv";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import Search from "../pages/Search";
import NotFound from "../pages/NotFound";
import RetroPage from "../pages/RetroPage";
import Seasons from "../pages/Seasons";

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/films" element={<Films />} />
      <Route path="/films/:id" element={<Film />} />
      <Route path="/artists" element={<Actors />} />
      <Route path="/artists/:id" element={<Actor />} />
      <Route path="/tv" element={<Tvs />} />
      <Route path="/tv/:id" element={<Tv />} />
      <Route path="/tv/:id/seasons/:season" element={<Seasons />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/search/" element={<Search />} />
      <Route path="/search/:query" element={<Search />} />
      <Route path="/retro/:year" element={<RetroPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
