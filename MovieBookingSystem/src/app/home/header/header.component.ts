import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchText:string = "";
  @Output() searchVal = new EventEmitter<string>();
  inputForm: FormGroup;
  constructor(private router: Router,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      inputVal : [''],
    });
  }

  signUpReRoute() {
    this.router.navigateByUrl('/SignUp');
  }

  loginReroute() {
    this.router.navigateByUrl('/Login');
  }

  search(evt:any) {
    this.searchVal.emit(evt);
  }

  clearSearch() {
    this.searchText = "";
    this.searchVal.emit(this.searchText);
  }

}
