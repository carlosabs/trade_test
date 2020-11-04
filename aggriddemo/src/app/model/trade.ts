import { Counterparty } from './counterparty';

export class Trade {
    UserId:number;
    Product: string;
    Price: number;
    Quantity: number;
    Direction : boolean;
    Date: Date;
    IdCounterparty:number;
    Counterparty:Counterparty;
}
