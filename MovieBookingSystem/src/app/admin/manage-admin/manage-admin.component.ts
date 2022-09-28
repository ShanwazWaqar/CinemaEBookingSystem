import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.scss']
})
export class ManageAdminComponent implements OnInit {

  admins = [
    {
      firstname : "Shanwaz",
      lastName : "Kotekanti",
      gmail : "ShanwazKotekanti@gmail.com",
    },
    {
      firstname : "Naveen",
      lastName : "Kurra",
      gmail : "naveenKurra@gmail.com",
    },
    {
      firstname : "punith",
      lastName : "kandula",
      gmail : "punithkandula@gmail.com",
    },
    {
      firstname : "raymond",
      lastName : "feckoury",
      gmail : "raymondFeckoury@gmail.com",
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

  removeAdmin(i:any) {
    this.admins.splice(i,1);
  }

}
