import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';
import { Company } from '../models/company.model';

@Component({
  selector: 'app-add-company-modal',
  templateUrl: './add-company-modal.component.html',
  styleUrls: ['./add-company-modal.component.css']
})
export class AddCompanyModalComponent implements OnInit {

  @Input() companyToken: string;
  companyData: Company = new Company();
  stockExchanges: string[] = ['NSE', 'BSE'];

  constructor(private activeModal: NgbActiveModal, private toastr: ToastrService,
    private appService: AppService) { }

  ngOnInit(): void {

  }

  closeModal(text: string) {
      this.activeModal.close(text);
  }

  addCompany() {
    if (this.companyData.companyName
      && this.companyData.companyCode
      && this.companyData.companyCeo
      && this.companyData.companyTurnover
      && this.companyData.companyWebsite
      && this.stockExchanges) {
      this.appService.registerCompany(this.companyToken, this.companyData).subscribe((data: any) => {
        console.log(data);
        if (data['message'] != null && data['message']['code'] == 'COMPANY_REGISTERED') {
          this.toastr.success(data['message']['description'], data['message']['code']);
          this.closeModal('success');
        } else {
          this.toastr.error(data['message']['description'], data['message']['code']);
        }
      }, fail => {
        let error = fail.error;
        this.toastr.error(error['message']['description'], error['message']['code']);
      })
    } else {
      this.toastr.error('All fields are Mandatory', 'Error');
    }
  }

}
