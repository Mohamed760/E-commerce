import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../../shared/services/order/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cashorder',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cashorder.component.html',
  styleUrl: './cashorder.component.scss'
})
export class CashorderComponent {

  successMsg!:string;

  constructor(private _OrderService:OrderService, private _ActivatedRoute:ActivatedRoute){}

  cashOrderForm : FormGroup = new FormGroup({
    details : new FormControl(null, [Validators.required]),
    phone : new FormControl (null, [Validators.required]),
    city : new FormControl (null, [Validators.required])
  })

  submitCashOrder(){

    if (this.cashOrderForm.valid) {
      this._ActivatedRoute.paramMap.subscribe({

        next : (p)=> {
          console.log(p);

          this._OrderService.checkOutCash(p.get("cashid")!, this.cashOrderForm.value).subscribe({
            next : (res)=> {
              console.log(res);
              this.successMsg = res.status;
            }

          })
        }
      })
    }

  }

}
