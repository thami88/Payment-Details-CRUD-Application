import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  formData:PaymentDetail;
  readonly rootURL = 'http://localhost:51552/api';
  list : PaymentDetail[];

  constructor(private http:HttpClient) { }

  postPaymentDetails(){
    return this.http.post(this.rootURL + '/PaymentDetail', this.formData);
  }
  putPaymentDetails(){
    return this.http.put(this.rootURL + '/PaymentDetail/' + this.formData.PMId, this.formData);
  }
  deletePaymentDetails(id){
    return this.http.delete(this.rootURL + '/PaymentDetail/' + id);
  }

  refreshList(){
    this.http.get(this.rootURL + '/PaymentDetail')
    .toPromise()
    .then(res => this.list = res as PaymentDetail[]);
  }
}
