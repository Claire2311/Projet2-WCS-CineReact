// Déclaration de la fonction translateLanguages, qui traduit en français les langues de l'oeuvre "initial" en paramètre , retourne la chaîne translated

export default function translateLanguages(initial) {
  const translated = initial
    .replace("English", "Anglais")
    .replace("French", "Français")
    .replace("Spanish", "Espagnol")
    .replace("Portuguese", "Portuguais")
    .replace("German", "Allemand")
    .replace("Italian", "Italien")
    .replace("Japanese", "Japonais")
    .replace("Russian", "Russe")
    .replace("Cantonese", "Cantonais")
    .replace("Arabic", "Arabe")
    .replace("Greek", "Grec")
    .replace("Korean", "Coréen")
    .replace("Hindi", "Indien");

  return translated;
}
