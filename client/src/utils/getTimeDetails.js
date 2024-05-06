//output 	9-May-2024
export const getFormatDate = (date) => {
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  const formatedDate = `${day}-${month}-${year}`;
  return formatedDate;
};

//output 	2024-02-09
export const dateFormatter = (dateString) => {
  const inpiutDate = new Date(dateString);

  if (isNaN(inpiutDate)) {
    return "invalid date";
  }

  const year = inpiutDate.getFullYear();
  const month = String(inpiutDate.getMonth() + 1).padStart(2, "0");
  const day = String(inpiutDate.getDate()).padStart(2, "0");

  const formatedDate = `${year}-${month}-${day}`;

  return formatedDate;
};
