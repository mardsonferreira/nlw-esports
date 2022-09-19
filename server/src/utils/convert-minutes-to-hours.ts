function convertMinutesToHourString(minutes: number) {
    const _hours = Math.floor(minutes / 60);
    const _minutes = minutes % 60;

    return `${String(_hours).padStart(2, "0")}:${String(_minutes).padStart(
        2,
        "0"
    )}`;
}

export { convertMinutesToHourString };
