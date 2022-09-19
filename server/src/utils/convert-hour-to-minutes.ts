function convertHoursStringToMinutes(hourString: String) {
    const [hours, minutes] = hourString.split(":").map(Number);

    return hours * 60 + minutes;
}

export { convertHoursStringToMinutes };
