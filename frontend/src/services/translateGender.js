// Déclaration de la fonction translateGender, qui traduit le genre de l'acteur "initialGender" d'un integer vers le genre en français, retourne la chaîne translatedGender

export default function translateGender(initialGender) {
  let translatedGender;
  switch (initialGender) {
    case 0:
      translatedGender = "Non renseigné";
      break;
    case 1:
      translatedGender = "Femme";
      break;
    case 2:
      translatedGender = "Homme";
      break;
    case 3:
      translatedGender = "Non binaire";
      break;
    default:
      translatedGender = "Non renseigné";
  }
  return translatedGender;
}
