import { Document } from 'mongoose';

export default interface City extends Document {
    city_name: string;
    api_called_date: string;
    list: [];
    pollution_en: string;
    pollution_kr: string;
}
