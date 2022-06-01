import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppService } from './app.service';
import { Company } from './company.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  companyToken: string = "";
  stockToken: string = "";

  dataSource: MatTableDataSource<Company> = new MatTableDataSource();

  companyCodeFilter: string = "";
  companies: Company[] = [];
  displayColumns = ['No.', 'Name', 'Code', 'Stock Exchange', 'Latest Stock Price', 'Website'];
  allCompanyFlag: boolean = true;
  companySearchFlag: boolean = false;
  companyData: Company;
  fromDateValue: any;
  toDateValue: any;
  minDate: any;
  maxDate: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private appService: AppService, private toastr: ToastrService,
    private datePipe: DatePipe) {
  }
  ngOnInit() {
    this.appService.getCompanyAccessToken().subscribe((data: any) => {
      this.companyToken = data["access_token"];
      // this.getAllCompany();
      this.getCompanyByCompanyCode('abc');
    })
    this.appService.getStockAccessToken().subscribe((data: any) => {
      this.stockToken = data['access_token'];
    })
  }

  getCompanyByCompanyCode(companyCode: string) {
    this.appService.getCompanyByCompanyCode(this.companyToken, companyCode).subscribe((data: any) => {
      console.log(data);
      if (data['message'] != null && data['message']['code'] == 'COMPANY_FOUND') {
        this.toastr.success(data['message']['description'], data['message']['code']);
        this.companies = [];
        this.companyData = data['data'];
        this.allCompanyFlag = false;
        this.companySearchFlag = true;
      } else {
        this.toastr.error(data['message']['description'], data['message']['code']);
      }
    }, fail => {
      let error = fail.error;
      this.toastr.error(error['message']['description'], error['message']['code']);
    })
  }

  getAllCompany() {
    this.appService.getAllCompanies(this.companyToken).subscribe((data: any) => {
      if (data['message'] != null && data['message']['code'] == 'DATA_FETCH_SUCCESS') {
        this.companies = data['data'];
        this.dataSource = new MatTableDataSource(this.companies);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 50);
        this.companySearchFlag = false;
        this.allCompanyFlag = true;
      } else {
        this.toastr.error(data['message']['description'], data['message']['code']);
      }
    })
  }

  filterStocks() {
    console.log("fromDate: ", this.fromDateValue)
    let fromDate = this.datePipe.transform(this.fromDateValue, 'dd-MM-yyyy')
    console.log(fromDate)

    console.log("toDate: ", this.toDateValue)
    let toDate = this.datePipe.transform(this.toDateValue, 'dd-MM-yyyy')
    console.log(toDate)
  }

  setMaxDate() {
    this.maxDate = this.toDateValue;
  }

  setMinDate() {
    this.minDate = this.fromDateValue;
  }

  resetDates() {
    this.minDate = null;
    this.maxDate = null;
    this.fromDateValue = null;
    this.toDateValue = null;
  }
}
