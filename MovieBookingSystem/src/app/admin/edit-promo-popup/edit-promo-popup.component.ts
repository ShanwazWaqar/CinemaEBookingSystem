import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { bmsApiService } from '../../services/bmsapi.service';
import { MsgPopupComponent } from '../../admin/msg-popup/msg-popup.component';

@Component({
  selector: 'app-edit-promo-popup',
  templateUrl: './edit-promo-popup.component.html',
  styleUrls: ['./edit-promo-popup.component.scss']
})
export class EditPromoPopupComponent implements OnInit {
  promoData:any;
  promoForm :FormGroup;
  oldPCode:any="";
  @Output() closePromoPopup = new EventEmitter();
  constructor(private dialogRef: MatDialog,private fb: FormBuilder,private Ref:MatDialogRef<EditPromoPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private readonly changeDetectorRef: ChangeDetectorRef, private bms: bmsApiService) { 
    this.promoData = data;
  }
   closeValue:any;

  ngOnInit(): void {
    this.promoForm = this.fb.group({
      name : ['',[Validators.required ]],
      promoCode : ['', [Validators.required]],
      discount: ['',[Validators.required ]],
      startDate: ['',[ ]],
      endDate: ['',[]]
    });
    this.promoForm.patchValue({
      promoCode: this.promoData.pcode,
      discount: this.promoData.percentage,
      startDate: this.promoData.start,
      endDate: this.promoData.end
    });
    this.oldPCode = this.promoData.pcode;
  }

  openModal(){
    
  }

  closeModal(){
    this.Ref.close();
  }

  updatePromo() {
    let obj:any;
    let email:any = "";
    if(!localStorage.getItem("adMail")) {
      email = "Shanwaz.9030@gmail.com"
    } else {
      email = ""+localStorage.getItem("adMail");
    }
    obj = {
      old_pcode: this.oldPCode,
      pcode : this.promoForm.value.promoCode,
      percentage: this.promoForm.value.discount,
      start: this.promoForm.value.startDate,
      end : this.promoForm.value.endDate,
      email: email
    };
    obj = JSON.stringify(obj);
    this.bms.updatePromotion(obj).subscribe(res=>{
      if(res) {
        const popup2 = this.dialogRef.open(MsgPopupComponent, {
          disableClose: true,
          enterAnimationDuration: '700ms',
          exitAnimationDuration:'1000ms',
          maxHeight: '80vh',
          width: '400px',
          data: "Promotion Edited Successfully!!!"
        });
        popup2.afterClosed().subscribe(item =>{
          this.ngOnInit();
          this.closeValue = this.promoForm.value;
          this.Ref.close(this.closeValue);
        });
      }
    });
  }
}
