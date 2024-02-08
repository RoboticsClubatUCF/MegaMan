export default () => {
  const currMonth = new Date().getMonth(); // 0-11
  const currYear = new Date().getFullYear();
  if (currMonth < 4) {
    return {
      year: currYear,
      semester: "Spring",
    };
  } else if (currMonth > 4 && currMonth < 7) {
    return {
      year: currYear,
      semester: "Summer",
    };
  }
  return {
    year: currYear,
    semester: "Fall",
  };
};
