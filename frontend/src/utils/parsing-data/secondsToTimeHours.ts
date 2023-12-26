const secondsToTimeHours = (seconds: number) => {
  let secondsToParse = seconds;
  if (secondsToParse === 86400) secondsToParse -= 1;
  var date = new Date(0);
  date.setSeconds(secondsToParse);
  var timeString = date.toISOString().substring(11, 19);
  return timeString;
};

export default secondsToTimeHours;
