import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // companyBaseUrl: string = environment.companyBaseUrl;
  // stockBaseUrl: string = environment.stockBaseUrl;
  url: string = environment.url;

  username: string = environment.username;
  password: string = environment.password;

  constructor(private http: HttpClient) { }

  getCompanyAccessToken() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    }
    const body = new HttpParams()
      .set('username', this.username)
      .set('password', this.password);
    return this.http.post(this.url + "company/login", body.toString(), httpOptions);
  }

  getStockAccessToken() {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    }
    const body = new HttpParams()
      .set('username', this.username)
      .set('password', this.password);
    return this.http.post(this.url + "stock/login", body.toString(), httpOptions);
  }

  getAllCompanies(token: string) {
    const httpOptions = this.getHttpoptions(token);
    return this.http.get(this.url + "company", httpOptions);
  }

  registerCompany(token: string, companyData: any) {
    const httpOptions = this.getHttpoptions(token);
    return this.http.post(this.url + "company", companyData, httpOptions);
  }

  getCompanyByCompanyCode(token: string, companyCode: string) {
    const httpOptions = this.getHttpoptions(token);
    return this.http.get(this.url + "company/" + companyCode, httpOptions);
  }

  deleteCompanyByCompanyCode(token: string, companyCode: string) {
    const httpOptions = this.getHttpoptions(token);
    return this.http.delete(this.url + "company/" + companyCode, httpOptions);
  }

  addCompanyStock(token: string, companyCode: string, data: any) {
    const httpOptions = this.getHttpoptions(token);
    return this.http.post(this.url + "stock/" + companyCode, data, httpOptions);
  }

  filterStock(token: string, companyCode: string, startDate: string, endDate: string) {
    const httpOptions = this.getHttpoptions(token);
    return this.http.get(this.url + "stock/" + companyCode + "/" + startDate + "/" + endDate, httpOptions);
  }

  getHttpoptions(token: string) {
    return {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
    }
  }
}
