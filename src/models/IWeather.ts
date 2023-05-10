export interface IWeather {
    id: number;
    name: string;
    timezone: number;
    weather: [
        {
            main: string;
            description: string;
            icon: string;
        }
    ];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    visibility: number;
    wind: {
        speed: number;
    };
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    lastUpdateTime: string;
    isUpdate: boolean;
}
