const validateApiToday = (api_called_date: Date) => {
    // Parse the date string into a Date object
    const date = new Date(api_called_date);

    // Get the Unix timestamp for the given date
    const timestamp = Math.floor(date.getTime() / 1000);

    // Get the current date
    const now = new Date();

    // Get the Unix timestamp for the current date
    const nowTimestamp = Math.floor(now.getTime() / 1000);

    // Check if the timestamp for the given date falls within the same day as the current date
    if (Math.floor(timestamp / 86400) === Math.floor(nowTimestamp / 86400)) {
        return true;
    } else {
        return false;
    }
};
