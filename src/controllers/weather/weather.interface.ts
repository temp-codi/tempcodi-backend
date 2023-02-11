import { Document } from 'mongoose';
import { IUpdatedWeatherData } from '@/utils/interfaces/weather';

export default interface City extends Document {
    city_name: string;
    api_called_date: string;
    list: IUpdatedWeatherData[];
    pollution_en: string;
    pollution_kr: string;
}
