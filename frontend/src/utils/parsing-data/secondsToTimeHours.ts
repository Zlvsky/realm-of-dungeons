const secondsToTimeHours = (seconds: number) => {
  var date = new Date(0);
  date.setSeconds(seconds);
  var timeString = date.toISOString().substring(11, 19);
  return timeString;
};

export default secondsToTimeHours;
