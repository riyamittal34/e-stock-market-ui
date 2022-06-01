import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppService } from './app.service';
import { Company } from './models/company.model';
import { Stock } from './models/stock.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  companyToken: string = "";
  stockToken: string = "";

  dataSource: MatTableDataSource<Company> = new MatTableDataSource();
  stockDataSource: MatTableDataSource<Stock> = new MatTableDataSource();

  companyCodeFilter: string = "";
  companies: Company[] = [];
  companyColumns = ['No.', 'Name', 'Code', 'Stock Exchange', 'Latest Stock Price', 'Website'];
  stockColumns = ['No.', 'Stock Price', 'Date', 'Timestamp'];
  allCompanyFlag: boolean = true;
  companySearchFlag: boolean = false;
  companyData: Company;
  fromDateValue: any;
  toDateValue: any;
  minDate: any;
  maxDate: any;
  stocks: Stock[] = [];
  stockFlag: boolean = false;

  stockPageSize: number = 5;
  stockPageIndex: number = 0;
  companyPageSize: number = 5;
  companyPageIndex: number = 0;

  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;

  constructor(private appService: AppService, private toastr: ToastrService,
    private datePipe: DatePipe) {
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
      if (data['message'] != null && data['message']['code'] == 'COMPANY_FOUND') {
        this.toastr.success(data['message']['description'], data['message']['code']);
        this.companyData = data['data'];
        this.companies = [];
        this.allCompanyFlag = false;
        this.companySearchFlag = true;
        this.resetDates();
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
          this.dataSource.paginator = this.paginator1;
        }, 50);
        this.companySearchFlag = false;
        this.allCompanyFlag = true;
        this.resetDates();
      } else {
        this.toastr.error(data['message']['description'], data['message']['code']);
      }
    }, fail => {
      let error = fail.error;
      this.toastr.error(error['message']['description'], error['message']['code']);
    })
  }

  filterStocks() {
    let fromDate = this.datePipe.transform(this.fromDateValue, 'dd-MM-yyyy') + "";
    let toDate = this.datePipe.transform(this.toDateValue, 'dd-MM-yyyy') + "";

    this.appService.filterStock(this.stockToken, this.companyCodeFilter, fromDate, toDate)
      .subscribe((data: any) => {
        console.log(data);
        if (data['message'] != null && data['message']['code'] == 'FILTER_STOCK_SUCCESS') {
          this.toastr.success(data['message']['description'], data['message']['code']);
          this.companyData = data['data'];
          this.stocks = this.companyData.stocks;
          this.allCompanyFlag = false;
          this.stockFlag = true;
          this.stockDataSource = new MatTableDataSource(this.stocks);
          setTimeout(() => {
            this.stockDataSource.paginator = this.paginator2;
          }, 50);
        } else {
          this.toastr.error(data['message']['description'], data['message']['code']);
        }
      }, fail => {
        let error = fail.error;
        this.toastr.error(error['message']['description'], error['message']['code']);
      })
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
    this.stockFlag = false;
    this.stocks = [];
  }

  stockPageChangeEvent($event: PageEvent) {
    console.log("event: ", $event);
    this.stockPageIndex = $event.pageIndex;
    this.stockPageSize = $event.pageSize;
  }

  companyPageChangeEvent($event: PageEvent) {
    console.log("event: ", $event);
    this.companyPageIndex = $event.pageIndex;
    this.companyPageSize = $event.pageSize;
  }
}
