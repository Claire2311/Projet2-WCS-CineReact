import femaleHolder from "../assets/female-holder.png";
import maleHolder from "../assets/male-holder.png";
import genericHolder from "../assets/profile-holder.png";

export default function getGender(actor) {
  if (actor.gender === 1) {
    return femaleHolder;
  }
  if (actor.gender === 2) {
    return maleHolder;
  } else {
    return genericHolder;
  }
}
