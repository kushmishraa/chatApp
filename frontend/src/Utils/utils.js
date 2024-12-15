export const convertObjToMap = (obj) => {
    return new Map(Object.entries(obj))
}

export const getHoursMin = (timeStamp) => {
    const date = new Date(Number(timeStamp));

    // Extract hours and minutes
    const hours = date.getHours().toString().padStart(2, '0'); // Ensures two-digit format
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Combine into HH:MM format
    const time = `${hours}:${minutes}`;

    return time;
}