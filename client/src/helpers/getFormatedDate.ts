export const getFormatedDate = (date: string) => {
  const resDate = new Date(date);
  const month =
    resDate.getMonth() + 1 >= 10
      ? resDate.getMonth() + 1
      : "0" + (resDate.getMonth() + 1);
  const day =
    resDate.getDate() >= 10 ? resDate.getDate() : "0" + resDate.getDate();
  return day + "." + month + "." + resDate.getFullYear();
};
