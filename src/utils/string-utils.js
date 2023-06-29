export function replaceCamelCaseWithSpaces(string) {
  const regex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
  return string.replace(regex, '$1$4 $2$3$5');
}
