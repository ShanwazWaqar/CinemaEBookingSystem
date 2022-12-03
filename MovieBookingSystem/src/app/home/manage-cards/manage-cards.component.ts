import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    return (this.cardForm.get('cardsArray') as FormArray);
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
      cardNumber : ['',[Validators.required,Validators.pattern("[0-9]{12}")]],
      expiryMonth : ['',[Validators.required,cardMonthCheck]],
      expiryYear : ['',[Validators.required,Validators.pattern('^[0-9]{4}$')]],
      nameOnCard : ['',[Validators.required]],
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
    console.log(cardList," cardList");
    cardList.removeAt(index);
  }

  submit() {
    console.log("submit");
    console.log(this.cardForm.value);
  }

}

function cardMonthCheck(control: AbstractControl): {[key:string]:any} | null { 
  const month:string = control.value;
  if(month == null) {
    console.log(month," 1-> month val in card month check" ,  )
    return { 'monthError' : false };
  } else {
    const regex = new RegExp('/^[0-9]{2}$/');
    console.log(regex.test(month)," regex test")
    if(month.length == 2) {
      console.log(month,"2 -> month val in card month checck", month+"".length)
      return { 'monthError' : false };
    } else {
      console.log(month,"3-> month val in card month checck", month+"".length)
      return { 'monthError' : true }
    }
  }

 }
