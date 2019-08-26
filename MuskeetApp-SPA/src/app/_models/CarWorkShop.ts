import {TradeMarks} from '../_models/TradeMark';

export interface CarWorkShop {
    companyId: number;
    companyName: string;
    TradeMarks: TradeMarks[];
    city: string;
    postalCode: string;
    country: string;
}
