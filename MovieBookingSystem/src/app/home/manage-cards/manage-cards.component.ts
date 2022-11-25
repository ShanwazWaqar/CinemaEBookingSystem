import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-cards',
  templateUrl: './manage-cards.component.html',
  styleUrls: ['./manage-cards.component.scss']
})
export class ManageCardsComponent implements OnInit {
  cardForm: FormGroup;
  cardDetails:any;
  cardValueChanges:any;
  constructor(private router: Router, private fb: FormBuilder) { }

  get cards() {
    return this.cardForm.get('cardsArray') as FormArray;
  }

  ngOnInit(): void {
    // let user = (localStorage.getItem("loggedIn")); 
    // if(!(user == "true")) {
    //   this.router.navigateByUrl('/home');
    // }
    this.cardForm = this.fb.group({
      cardsArray : this.fb.array([this.createCardForm()])
    });
    // this.cardDetails = this.cardForm.get('cardsArray') as FormArray;
    this.cardValueChanges = this.cardForm.controls["cardsArray"].valueChanges;

  }

  createCardForm(): FormGroup {
    return this.fb.group({
      cardNumber: [null, Validators.compose([Validators.required])],
      expiryMonth: [null, Validators.compose([Validators.required])],
      expiryYear: [null, Validators.compose([Validators.required])],
      nameOnCard: [null, Validators.compose([Validators.required])]
    });
  }

  addCard() {
    const cardsList = <FormArray> this.cardForm.controls['cardsArray'];
    
    if(cardsList.length < 3) {
      cardsList.push(this.createCardForm());
      console.log(cardsList.length," length");
    } else {
      // error popup says card limit exceeded.
      
    }
    // this.cardDetails.push(this.createCardForm());
  }

  removeCard(index:any) {
    const cardList = <FormArray> this.cardForm.controls['cardsArray'];
    cardList.removeAt(index);
  }

  submit() {
    console.log("submit");
    console.log(this.cardForm.value);
  }

}
