import { Component, HostListener, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { PromoPopupComponent } from '../promo-popup/promo-popup.component';

@Component({
  selector: 'app-manage-promos',
  templateUrl: './manage-promos.component.html',
  styleUrls: ['./manage-promos.component.scss']
})
export class ManagePromosComponent implements OnInit {
  showModal:boolean=false;
  //delete array
  promosArray = [
    {
      name: "Promo Name 1",
      promoCode : "GET15OFF",
      discount: "15",
      validity: "",
      sendToUser: ""
    },
    {
      name: "Promo Name 1",
      promoCode : "GET15OFF",
      discount: "15",
      validity: "",
      sendToUser: ""
    },
    {
      name: "Promo Name 1",
      promoCode : "SALE",
      discount: "5",
      validity: "",
      sendToUser: ""
    },
    {
      name: "Promo Name 1",
      promoCode : "PROMO1",
      discount: "1",
      validity: "",
      sendToUser: ""
    },
    {
      name: "v",
      promoCode : "PROMO2",
      discount: "2",
      validity: "",
      sendToUser: ""
    },
    {
      name: "Promo Name 1",
      promoCode : "PROMO3",
      discount: "3",
      validity: "",
      sendToUser: ""
    },
    {
      name: "Promo Name 1",
      promoCode : "PROMO4",
      discount: "4",
      validity: "",
      sendToUser: ""
    },
    {
      name: "Promo Name 1",
      promoCode : "PROMO5",
      discount: "5",
      validity: "",
      sendToUser: ""
    },
    {
      name: "Promo Name 1",
      promoCode : "PROMO6",
      discount: "6",
      validity: "",
      sendToUser: ""
    },
    {
      name: "Promo Name 1",
      promoCode : "PROMO6",
      discount: "6",
      validity: "",
      sendToUser: ""
    }
  ];

  constructor(private dialogRef: MatDialog) {
    
   }

  ngOnInit(): void {
  }

  showAddPromoForm(){
    this.openDialog();
  }

  openDialog() {
    const popup = this.dialogRef.open(PromoPopupComponent, {disableClose: true,enterAnimationDuration: '700ms',exitAnimationDuration:'1000ms'});
    popup.afterClosed().subscribe(item =>{
      if(item){
        const obj = {
          name: item.name,
          promoCode : item.promoCode,
          discount: item.discount,
          validity: item.validity,
          sendToUser: ""
        };
        this.promosArray.push(obj);
      }
    });
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.closeAll();
  }

  deletePromo(i:any){
    this.promosArray.splice(i,1);
    console.log("delete promo",i)
  }

}
