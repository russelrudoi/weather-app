export const converTimeZone = (
    timezone: number,
    unit: 'time' | 'date'
): string => {
    const localTime = new Date(new Date().getTime() + timezone * 1000);
    if (unit === 'time') {
        const localHours = localTime.getUTCHours().toString().padStart(2, '0');
        const localMinutes = localTime
            .getUTCMinutes()
            .toString()
            .padStart(2, '0');

        return `${localHours}:${localMinutes}`;
    } else {
        const localDay = localTime.getUTCDay();
        const localMounth = localTime.toLocaleString('en-US', {
            month: 'long'
        });

        return `${localMounth} ${localDay}`;
    }
};

export const currentDate = (date: string): string => {
    const currentDate = new Date(date),
        currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'),
        currentDay = currentDate.getDate().toString().padStart(2, '0'),
        currentHours = currentDate.getHours().toString().padStart(2, '0'),
        currentMinutes = currentDate.getMinutes().toString().padStart(2, '0'),
        currentSeconds = currentDate.getSeconds().toString().padStart(2, '0');

    return `${currentDay}.${currentMonth} ${currentHours}:${currentMinutes}:${currentSeconds}`;
};
