import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {
  cardDetails:boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  updateProfile() {
    this.router.navigateByUrl('/userHomePage');
  }

  showCardDetails() {
    this.cardDetails = true;
  }

}
