/** interface for weather data from api */
export interface IApiWeatherData {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    };
    weather: [{ id: number; main: string; description: string; icon: string }];
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
        pod: string;
    };
    dt_txt: string;
}

/** interface for weather data that is being converted into */
export interface IUpdatedWeatherData {
    dt: number;
    temp: number;
    feels_like: number;
    humidity: number;
    cloud_in_percentage: number;
    wind_speed: number;
    weather_id: number;
}
