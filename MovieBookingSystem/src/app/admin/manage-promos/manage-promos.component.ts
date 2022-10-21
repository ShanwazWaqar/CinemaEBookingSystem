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
      startDate: "2022-10-14",
      EndDate : "2022-10-28",
      sendToUser: ""
    },
    {
      name: "Promo Name 1",
      promoCode : "GET15OFF",
      discount: "15",
      startDate: "2022-10-14",
      EndDate : "2022-10-28",
      sendToUser: ""
    },
    {
      name: "Promo Name 1",
      promoCode : "SALE",
      discount: "5",
      startDate: "2022-10-14",
      EndDate : "2022-10-28",
      sendToUser: ""
    },
    {
      name: "Promo Name 1",
      promoCode : "PROMO1",
      discount: "1",
      startDate: "2022-10-14",
      EndDate : "2022-10-28",
      sendToUser: ""
    },
    {
      name: "v",
      promoCode : "PROMO2",
      discount: "2",
      startDate: "2022-10-14",
      EndDate : "2022-10-28",
      sendToUser: ""
    },
    {
      name: "Promo Name 1",
      promoCode : "PROMO3",
      discount: "3",
      startDate: "2022-10-14",
      EndDate : "2022-10-28",
      sendToUser: ""
    },
    {
      name: "Promo Name 1",
      promoCode : "PROMO4",
      discount: "4",
      startDate: "2022-10-14",
      EndDate : "2022-10-28",
      sendToUser: ""
    },
    {
      name: "Promo Name 1",
      promoCode : "PROMO5",
      discount: "5",
      startDate: "2022-10-14",
      EndDate : "2022-10-28",
      sendToUser: ""
    },
    {
      name: "Promo Name 1",
      promoCode : "PROMO6",
      discount: "6",
      startDate: "2022-10-14",
      EndDate : "2022-10-28",
      sendToUser: ""
    },
    {
      name: "Promo Name 1",
      promoCode : "PROMO6",
      discount: "6",
      startDate: "2022-10-14",
      EndDate : "2022-10-28",
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
    const popup = this.dialogRef.open(PromoPopupComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration:'1000ms',
      maxHeight: '80vh',
      width: '900px',
    });
    popup.afterClosed().subscribe(item =>{
      if(item){
        const obj = {
          name: item.name,
          promoCode : item.promoCode,
          discount: item.discount,
          startDate: item.startDate,
          EndDate : item.endDate,
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
