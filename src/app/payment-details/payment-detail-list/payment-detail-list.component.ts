import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styleUrls: []
})
export class PaymentDetailListComponent implements OnInit {

  constructor(public service: PaymentDetailService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(pd:PaymentDetail){
    this.service.formData = Object.assign({},pd);
  }

  onDelete(PMId){
    if (confirm('Are you sure to delete this record ?')){
    this.service.deletePaymentDetails(PMId)
    .subscribe(res => {
      this.service.refreshList();
      this.toastr.warning('Deleted Successfully', 'Payment Detail Reegister');
    },
      err=>{
        console.log(err);
      })
  }
}

}
