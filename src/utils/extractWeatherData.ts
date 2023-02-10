import { IApiWeatherData, IUpdatedWeatherData } from './interfaces/weather';

/** converts to appropriate schema for mongoDB */
export const weatherApiUpdateList = (
    list: IApiWeatherData[]
): IUpdatedWeatherData[] => {
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
