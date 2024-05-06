export function getInitial(fullname) {
  if (typeof fullname === "string" && fullname.trim() !== "") {
    const names = fullname.split(" ");
    const initail = names.slice(0, 2).map((name) => name[0]?.toUpperCase());
    const initialsString = initail.join("");
    return initialsString;
  } else {
    return "";
  }
}
