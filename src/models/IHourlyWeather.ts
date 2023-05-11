export default interface IHourlyWeather {
    timezone_offset: number;
    hourly: [
        {
            temp: number;
        }
    ];
}
