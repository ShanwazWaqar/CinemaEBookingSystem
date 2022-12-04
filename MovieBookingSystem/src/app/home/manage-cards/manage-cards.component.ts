import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bmsApiService } from 'src/app/services/bmsapi.service';

@Component({
  selector: 'app-manage-cards',
  templateUrl: './manage-cards.component.html',
  styleUrls: ['./manage-cards.component.scss']
})
export class ManageCardsComponent implements OnInit {
  cardForm: FormGroup;
  cardDetails: any;
  cardValueChanges: any;
  constructor(private router: Router, private fb: FormBuilder, private bms: bmsApiService) { }

  get cards() {
    return (this.cardForm.get('cardsArray') as FormArray);
  }



  ngOnInit(): void {
    let user = (localStorage.getItem("loggedIn"));
    if (!(user == "true")) {
      this.router.navigateByUrl('/home');
    }
    this.cardForm = this.fb.group({
      cardsArray: this.fb.array([])
    });
    let obj: any;
    obj = {
      email: localStorage.getItem("user")
    };
    obj = JSON.stringify(obj);
    this.bms.retriveCards(obj).subscribe(res => {
      if (res) {
        if (res.length >= 1) {
          for (let i = 0; i < res.length; i++) {
            this.addValueCard(res[i]);
          }
        } else {
          this.addCard();
        }
        console.log(res, " res for card retrivl ", this.cardForm.value)
      }
    });
    // this.cardDetails = this.cardForm.get('cardsArray') as FormArray;
    this.cardValueChanges = this.cardForm.controls["cardsArray"].valueChanges;

  }

  addValueCard(card: any) {
    const cardsList = <FormArray>this.cardForm.controls['cardsArray'];
    let form = this.fb.group({
      cardNumber: [card.cardnumber, [Validators.required, Validators.pattern("[0-9]{12}")]],
      expiryMonth: [card.expirymonth, [Validators.required, cardMonthCheck]],
      expiryYear: [card.expiryyear, [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      nameOnCard: [card.nameoncard, [Validators.required]],
      oldCard: [card.cardnumber],
    });
    cardsList.push(form);
  }

  createCardForm(): FormGroup {
    return this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern("[0-9]{12}")]],
      expiryMonth: ['', [Validators.required, cardMonthCheck]],
      expiryYear: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      nameOnCard: ['', [Validators.required]],
      oldCard: ['']
    });
  }

  addCard() {
    const cardsList = <FormArray>this.cardForm.controls['cardsArray'];

    if (cardsList.length < 3) {
      cardsList.push(this.createCardForm());
      console.log(cardsList.length, " length");
    } else {
      // error popup says card limit exceeded.

    }
    // this.cardDetails.push(this.createCardForm());
  }

  removeCard(index: any) {
    const cardList = <FormArray>this.cardForm.controls['cardsArray'];
    cardList.removeAt(index);
  }

  createObj(length: any) {
    let obj: any = {};
    console.log("lenght is", length);
    if (length == 1) {
      let cardsArray: any;
      obj = [
        {
          cardnumber: this.cardForm.value.cardsArray[0].cardNumber,
          nameoncard: this.cardForm.value.cardsArray[0].nameOnCard,
          expirymonth: this.cardForm.value.cardsArray[0].expiryMonth,
          expiryyear: this.cardForm.value.cardsArray[0].expiryYear,
          old_data: this.cardForm.value.cardsArray[0].cardNumber,
        }
      ]
        ;

    } else if (length == 2) {
      obj = {
        cardsArray: [
          {
            cardnumber: this.cardForm.value.cardsArray[0].cardNumber,
            nameoncard: this.cardForm.value.cardsArray[0].nameOnCard,
            expirymonth: this.cardForm.value.cardsArray[0].expiryMonth,
            expiryyear: this.cardForm.value.cardsArray[0].expiryYear,
            old_data: this.cardForm.value.cardsArray[0].cardNumber,
          },
          {
            cardnumber: this.cardForm.value.cardsArray[1].cardNumber,
            nameoncard: this.cardForm.value.cardsArray[1].nameOnCard,
            expirymonth: this.cardForm.value.cardsArray[1].expiryMonth,
            expiryyear: this.cardForm.value.cardsArray[1].expiryYear,
            old_data: this.cardForm.value.cardsArray[1].cardNumber,
          }
        ]
      };

    } else if (length == 3) {
      obj = {
        cardsArray: [
          {
            cardnumber: this.cardForm.value.cardsArray[0].cardNumber,
            nameoncard: this.cardForm.value.cardsArray[0].nameOnCard,
            expirymonth: this.cardForm.value.cardsArray[0].expiryMonth,
            expiryyear: this.cardForm.value.cardsArray[0].expiryYear,
            old_data: this.cardForm.value.cardsArray[0].cardNumber,
          },
          {
            cardnumber: this.cardForm.value.cardsArray[1].cardNumber,
            nameoncard: this.cardForm.value.cardsArray[1].nameOnCard,
            expirymonth: this.cardForm.value.cardsArray[1].expiryMonth,
            expiryyear: this.cardForm.value.cardsArray[1].expiryYear,
            old_data: this.cardForm.value.cardsArray[1].cardNumber,
          },
          {
            cardnumber: this.cardForm.value.cardsArray[2].cardNumber,
            nameoncard: this.cardForm.value.cardsArray[2].nameOnCard,
            expirymonth: this.cardForm.value.cardsArray[2].expiryMonth,
            expiryyear: this.cardForm.value.cardsArray[2].expiryYear,
            old_data: this.cardForm.value.cardsArray[2].cardNumber,
          }
        ]
      };

    }
    return obj;
  }

  submit() {

    // let obj = this.createObj(this.cardForm.value.cardsArray.length);
    // obj = JSON.stringify(obj);
    let obj: any;
    for (let i = 0; i < this.cardForm.value.cardsArray.length; i++) {
      console.log(this.cardForm.value.cardsArray[i].oldCard, " card old data");
      if (this.cardForm.value.cardsArray[i].oldCard != "") {
        obj = {
          cardnumber: this.cardForm.value.cardsArray[i].cardNumber,
          nameoncard: this.cardForm.value.cardsArray[i].nameOnCard,
          expirymonth: this.cardForm.value.cardsArray[i].expiryMonth,
          expiryyear: this.cardForm.value.cardsArray[i].expiryYear,
          old_data: this.cardForm.value.cardsArray[i].oldCard,
        };
        obj = JSON.stringify(obj);
        this.bms.update3Cards(obj).subscribe(res => {
          if (res) {
            console.log(res, " res for update3Cards");
          } else {
            console.log("error for update3Cards method api call");
          }
        });
      } else {
        obj = {
          cardnumber: this.cardForm.value.cardsArray[i].cardNumber,
          nameoncard: this.cardForm.value.cardsArray[i].nameOnCard,
          expirymonth: this.cardForm.value.cardsArray[i].expiryMonth,
          expiryyear: this.cardForm.value.cardsArray[i].expiryYear,
          old_data: this.cardForm.value.cardsArray[i].cardNumber,
          email : localStorage.getItem("user")
        };
        obj = JSON.stringify(obj);
        this.bms.addCards(obj).subscribe(res => {
          if (res) {
            console.log(res, " res for update3Cards");
          } else {
            console.log("error for update3Cards method api call");
          }
        });
      }

    }
  }




}

function cardMonthCheck(control: AbstractControl): { [key: string]: any } | null {
  const month: string = control.value;
  if (month == null) {
    // console.log(month," 1-> month val in card month check" ,  )
    return { 'monthError': false };
  } else {
    const regex = new RegExp('/^[0-9]{2}$/');
    console.log(regex.test(month), " regex test")
    if (month.length == 2) {
      // console.log(month,"2 -> month val in card month checck", month+"".length)
      return { 'monthError': false };
    } else {
      // console.log(month,"3-> month val in card month checck", month+"".length)
      return { 'monthError': true }
    }
  }

}
