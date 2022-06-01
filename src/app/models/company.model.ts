import { Stock } from "./stock.model";

export class Company {
    public companyId: string;
    public companyCode: string;
    public companyName: string;
    public companyCeo: string;
    public companyTurnover: string;
    public companyWebsite: string;
    public stockExchange: string;
    public latestStockPrice: number;
    public stocks: Stock[];
    public avgStockPrice: number;
    public minStockPrice: number;
    public maxStockPrice: number;
}
