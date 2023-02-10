/** converts to appropriate schema for mongoDB */
const weatherApiUpdateList = (list: IApiWeatherData[]): WeatherList[] => {
    return list.map((item) => {
        const {
            dt,
            main: { temp, feels_like, humidity },
            weather: [{ id }],
            clouds: { all },
            wind: { speed },
        } = item;
        return {
            dt,
            temp,
            feels_like,
            humidity,
            cloud_in_percentage: all,
            wind_speed: speed,
            weather_id: id,
        };
    });
};

interface IApiWeatherData {
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

interface WeatherList {
    dt: number;
    temp: number;
    feels_like: number;
    humidity: number;
    cloud_in_percentage: number;
    wind_speed: number;
    weather_id: number;
}
