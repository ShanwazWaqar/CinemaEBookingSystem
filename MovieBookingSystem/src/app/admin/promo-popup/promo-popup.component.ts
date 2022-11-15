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
      name: ['', [Validators.required]],
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
    if ((fromDate !== null && toDate !== null) && fromDate > toDate) {
      return {'endDateError': true};
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
    console.log("errors ", this.promoForm);
    if (this.promoForm.valid) {
      this.closeValue = this.promoForm.value;
      this.Ref.close(this.closeValue);
      console.log("promoform valid");
    } else {
      console.log("form not valid")
    }
  }

  filterDate(calenderDate: Date): boolean {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    return calenderDate >= yesterday;
  }

}



// export class CustomeDateValidators {
//   static fromToDate(fromDateField: string, toDateField: string, errorName: string = 'fromToDate'): ValidatorFn {
//       return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
//         const fromDate = this.promoForm.value.startDate;
//         const toDate = this.promoForm.value.endDate;
//        // Ausing the fromDate and toDate are numbers. In not convert them first after null check
//         if ((fromDate !== null && toDate !== null) && fromDate > toDate) {
//           console.log("error");
//             return {'endDateError': true};
//         }
//         console.log("no error")
//         return null;
//       };
//   }
// }
