export default function giveJobs(array, string) {
  return array
    .filter((film) => film.department.toLocaleLowerCase() === string)
    .sort((a, b) => b.release_date.localeCompare(a.release_date));
}
