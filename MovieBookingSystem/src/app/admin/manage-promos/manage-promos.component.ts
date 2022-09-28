import { Component, OnInit } from '@angular/core';

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
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  showAddPromoForm(){
    console.log("show popup")
    this.showModal = true;
  }

}
