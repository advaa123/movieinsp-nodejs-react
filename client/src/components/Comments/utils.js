// currently not in use

export const getDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const getTime = (date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getDateToday = () => {
  return new Date().toLocaleDateString();
};
