const secondsRemaining = (parsedDate: string) => {
    const now = new Date().getTime();
    const parsedDateTime = new Date(parsedDate).getTime();
    const miliSeconds = parsedDateTime - now;
    const seconds = Math.round(miliSeconds / 1000);
    return seconds;
}

export default secondsRemaining;