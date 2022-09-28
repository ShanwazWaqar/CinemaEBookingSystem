import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';

@Component({
  selector: 'app-promo-popup',
  templateUrl: './promo-popup.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./promo-popup.component.scss']
})
export class PromoPopupComponent implements OnInit {
  promoForm :FormGroup;
  @Output() closePromoPopup = new EventEmitter();
  constructor(private fb: FormBuilder,private Ref:MatDialogRef<PromoPopupComponent>) { 
  }
   closeValue:any;

  ngOnInit(): void {
    this.promoForm = this.fb.group({
      name : ['',[Validators.required ]],
      promoCode : ['', [Validators.required]],
      discount: ['',[Validators.required ]],
      validity: ['',[ ]],

    });
  }

  openModal(){
    
  }

  closeModal(){
    this.Ref.close();
  }

  addPromo() {
    this.closeValue = this.promoForm.value;
    this.Ref.close(this.closeValue);
  }

}
