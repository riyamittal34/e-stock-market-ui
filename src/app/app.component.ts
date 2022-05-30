import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  companyToken: string = "";
  stockToken: string = "";

  companyCodeFilter: string = "";
  companies: any[] = [];

  constructor(private appService: AppService) {
  }
  ngOnInit() {
    this.appService.getCompanyAccessToken().subscribe((data: any) => {
      this.companyToken = data["access_token"];
      this.getAllCompany();
    })
    this.appService.getStockAccessToken().subscribe((data: any) => {
      this.stockToken = data['access_token'];
    })
  }

  getCompanyByCompanyCode(companyCode: string) {
    this.appService.getCompanyByCompanyCode(this.companyToken, companyCode).subscribe((data: any) => {
      console.log(data);
    })
  }

  getAllCompany() {
    this.appService.getAllCompanies(this.companyToken).subscribe((data: any) => {
      if (data['message'] != null && data['message']['code'] == 'DATA_FETCH_SUCCESS') {
        this.companies = data['data'];
      }
    })
  }
}
