export function splitAndFormatString(str: string) {
  str = str.replace(/^linkTo/, "");
  str = str.replace(/^click/, "");
  str = str.replace(/^check/, "");
  let result = str.replace(/([a-z])([A-Z])/g, "$1 $2");
  if (result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  return result;
}
