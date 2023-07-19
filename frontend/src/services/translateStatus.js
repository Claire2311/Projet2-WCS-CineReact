export default function translateStatus(initialStatus) {
  let translatedStatus;
  switch (initialStatus) {
    case "Released":
      translatedStatus = "Sorti";
      break;
    case "Production":
      translatedStatus = "En production";
      break;
    case "Returning Series":
      translatedStatus = "Renouvelée";
      break;
    case "Ended":
      translatedStatus = "Terminée";
      break;
    case "Canceled":
      translatedStatus = "Arrêtée";
      break;
    case "Planned":
      translatedStatus = "Planifié";
      break;
    case "Pilot":
      translatedStatus = "Episodes pilotes";
      break;
    case "Post production":
      translatedStatus = "En post-production";
      break;
    case "Rumored":
      translatedStatus = "Rumeurs";
      break;
    default:
      translatedStatus = initialStatus;
      break;
  }
  return translatedStatus;
}
