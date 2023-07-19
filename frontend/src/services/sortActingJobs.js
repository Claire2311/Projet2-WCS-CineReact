export default function sortActingJobs(array) {
  return array.sort((a, b) => b.release_date.localeCompare(a.release_date));
}
