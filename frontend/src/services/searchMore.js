export default function searchMore(value, valueSetter) {
  if (value < 500) {
    valueSetter(value + 1);
  }
}
