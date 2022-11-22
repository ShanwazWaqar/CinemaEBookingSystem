import { Component, HostListener, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { PromoPopupComponent } from '../promo-popup/promo-popup.component';
import { bmsApiService } from '../../services/bmsapi.service';
import { EditPromoPopupComponent } from '../edit-promo-popup/edit-promo-popup.component';
import { MsgPopupComponent } from '../../admin/msg-popup/msg-popup.component';

@Component({
  selector: 'app-manage-promos',
  templateUrl: './manage-promos.component.html',
  styleUrls: ['./manage-promos.component.scss']
})
export class ManagePromosComponent implements OnInit {
  showModal:boolean=false;
  //delete array
  promosArray:any;

  constructor(private dialogRef: MatDialog,private bms: bmsApiService) {
    
   }

  ngOnInit(): void {
    this.bms.getAllPromos().subscribe(res=>{
      if(res) {
        this.promosArray = res;
      }
    });
  }

  showAddPromoForm(){
    this.openDialog();
  }

  sucessPopup(msg:any) {
    const popup2 = this.dialogRef.open(MsgPopupComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration:'1000ms',
      maxHeight: '80vh',
      width: '400px',
      data: msg
    });
    popup2.afterClosed().subscribe(item =>{
      this.ngOnInit();
    });
  }

  openDialog() {
    const popup = this.dialogRef.open(PromoPopupComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration:'1000ms',
      maxHeight: '80vh',
      width: '900px',
    });
    popup.afterClosed().subscribe(item =>{
      let email = "";
      console.log(localStorage.getItem("adMail")," get admin mail");
      if(!localStorage.getItem("adMail")) {
        email = "Shanwaz.9030@gmail.com"
      } else {
        email = ""+localStorage.getItem("adMail");
      }
      if(item){
        let obj :any = "";
        obj = {
          old_pcode: item.promoCode,
          pcode : item.promoCode,
          percentage: item.discount,
          start: item.startDate,
          end : item.endDate,
          email: email
        };
        obj = JSON.stringify(obj);
        // add promotion api call
        this.bms.addPromotion(obj).subscribe(res => {
          if(res) {
            //add promotion success popup
            this.sucessPopup("Promotion Created Successfully!!!");
          }
        });
      }
    });
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.closeAll();
  }

  deletePromo(data:any){
    let obj :any = "";
        obj = {
          pcode : data.pcode
        };
        obj = JSON.stringify(obj);
    this.bms.deletePromotion(obj).subscribe(res=>{
      if(res) {
        this.sucessPopup("Promotion Deleted Successfully!!!");
      }
    });
  }

  sendPromo(data:any) {
    let obj :any = "";
        obj = {
          pcode : data.pcode,
          start : data.start,
          end : data.end,
          percentage : data.percentage
        };
        obj = JSON.stringify(obj);
        console.log(obj," obj ",data)
    this.bms.sendPromotion(obj).subscribe(res=>{
      if(res) {
        this.sucessPopup("Promotion Sent Successfully!!!");
      }
    })
  }

  editPromo(promodata:any) {
    //edit promo
    const popup = this.dialogRef.open(EditPromoPopupComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration:'1000ms',
      maxHeight: '80vh',
      width: '900px',
      data: promodata 
    });
    popup.afterClosed().subscribe(item =>{
      this.ngOnInit();
    });
  }

}
