import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: []
})
export class PaymentDetailComponent implements OnInit {

  constructor(public service:PaymentDetailService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if (form != null)
    form.resetForm();
    this.service.formData ={
      PMId :0,
      CardOwnerName:'',
      CardNumber:'',
      ExpirationDate:'',
      CVV:''
    }
  }

  onSubmit(form:NgForm){
    if (this.service.formData.PMId == 0) {
      this.insertRecord(form);
    }
    else{
      // Update
      this.updateRecord(form);
    }

  }

  insertRecord(form:NgForm){

    this.service.postPaymentDetails().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted Successfuly', 'Payment Detail Register');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )

  }

  updateRecord(form:NgForm){

    this.service.putPaymentDetails().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted Successfuly', 'Payment Detail Register');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )

  }

}
