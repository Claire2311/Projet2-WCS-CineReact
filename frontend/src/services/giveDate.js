// Déclaration de la fonction giveDate qui transforme la date "initialDate" du format ISO vers le format local FR, retourne la variable date

export default function giveDate(initialDate) {
  const date = new Date(initialDate).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  return date;
}
