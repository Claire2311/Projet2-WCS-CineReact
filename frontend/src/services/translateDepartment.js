// Déclaration de la fonction translateDepartment, qui traduit l'activité de l'acteur "initialDepartment" en paramètre vers sa traduction en français, retourne la chaîne translatedDepartment

export default function translateDepartment(initialDepartment) {
  let translatedDepartment;
  switch (initialDepartment) {
    case "Acting":
      translatedDepartment = "Interprétation";
      break;
    case "Directing":
      translatedDepartment = "Réalisation";
      break;
    case "Writing":
      translatedDepartment = "Ecriture";
      break;
    case "Sound":
      translatedDepartment = "Composition";
      break;
    case "Art":
      translatedDepartment = "Direction artistique";
      break;
    case "Visual Effects":
      translatedDepartment = "Effets visuels";
      break;
    case "Editing":
      translatedDepartment = "Montage";
      break;
    case "Crew":
      translatedDepartment = "Equipe technique";
      break;
    case "Camera":
      translatedDepartment = "Photographie";
      break;
    case "Costume & Make-Up":
      translatedDepartment = "Costumes et maquillage";
      break;
    default:
      translatedDepartment = "Production";
      break;
  }
  return translatedDepartment;
}
