export class Company {
    private companyId: string;
    private companyCode: string;
    private companyName: string;
    private companyCeo: string;
    private companyTurnover: string;
    private companyWebsite: string;
    private stockExchange: string;
    private latestStockPrice: number;

    constructor(companyId: string, companyCode: string, companyName: string, 
        companyCeo: string, companyTurnover: string, companyWebsite: string, 
        stockExchange: string, latestStockPrice: number) {
            this.companyId = companyId;
            this.companyCeo = companyCeo;
            this.companyCode = companyCode;
            this.companyName = companyName;
            this.companyTurnover = companyTurnover;
            this.companyWebsite = companyWebsite;
            this.stockExchange = stockExchange;
            this.latestStockPrice = latestStockPrice;
    }

    getCompanyId(): string {
        return this.companyId;
    }

    public getCompanyCode(): string {
        return this.companyCode;
    }

    getCompanyName(): string {
        return this.companyName;
    }

    getCompanyCeo(): string {
        return this.companyCeo;
    }

    getCompanyTurnover(): string {
        return this.companyTurnover;
    }

    getCompanyWebsite(): string {
        return this.companyWebsite;
    }

    getStockExchange(): string {
        return this.stockExchange;
    }

    getLatestStockPrice(): number {
        return this.latestStockPrice;
    }

}
