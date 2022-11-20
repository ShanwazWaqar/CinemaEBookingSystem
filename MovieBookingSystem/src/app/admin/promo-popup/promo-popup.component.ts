import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDateRangeInput } from '@angular/material/datepicker';

@Component({
  selector: 'app-promo-popup',
  templateUrl: './promo-popup.component.html',
  styleUrls: ['./promo-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PromoPopupComponent implements OnInit {
  promoForm: FormGroup;
  @Output() closePromoPopup = new EventEmitter();
  @ViewChild(MatDateRangeInput) private rangeInput: MatDateRangeInput<Date>;
  today:any = new Date();

  constructor(private fb: FormBuilder, private Ref: MatDialogRef<PromoPopupComponent>) {
  }
  closeValue: any;

  ngOnInit(): void {
    this.promoForm = this.fb.group({
      promoCode: ['', [Validators.required, Validators.max(100), Validators.min(1)]],
      discount: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    }, {
      validators: this.startDatecheck.bind(this)
    });
  }

  startDatecheck(formGroup: FormGroup) {
    const fromDate = formGroup.get('startDate')?.value;
    const toDate  = formGroup.get('endDate')?.value;
    const discount = formGroup.get('discount')?.value;
    let rangeerror = false;
    
    if(discount<=0 || discount>99) {
      rangeerror = true;
    }
    formGroup.markAllAsTouched();
    if ((fromDate !== null && toDate !== null) && fromDate > toDate) {
      if(rangeerror) {
        return {'endDateError': true,'numberError':true};
      } else {
        return {'endDateError': true};
      }
    } else if(rangeerror) {
      return {'numberError': true};
    }
    return null;
  }

  openModal() {

  }

  closeModal() {
    this.Ref.close();
  }

  addPromo() {
    this.promoForm.markAllAsTouched();
    if (this.promoForm.valid) {
      this.closeValue = this.promoForm.value;
      this.Ref.close(this.closeValue);
    } else {
    }
  }

  filterDate(calenderDate: Date): boolean {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    return calenderDate >= yesterday;
  }

}
