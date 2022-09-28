import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  users = [
    {
      firstname : "Shanwaz",
      status : "Active",
      gmail : "ShanwazKotekanti@gmail.com",
    },
    {
      firstname : "Naveen",
      status : "Suspended",
      gmail : "naveenKurra@gmail.com",
    },
    {
      firstname : "punith",
      status : "Not Verified",
      gmail : "punithkandula@gmail.com",
    },
    {
      firstname : "raymond",
      status : "Active",
      gmail : "raymondFeckoury@gmail.com",
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
