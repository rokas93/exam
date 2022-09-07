const dateToSeconds = (date, time) => {
  return new Date(`${date}T${time}`).getTime();
};

export default dateToSeconds;
