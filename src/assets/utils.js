export const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const timeToString = (time) => {
  return time.toString().padStart(2, "0");
};
