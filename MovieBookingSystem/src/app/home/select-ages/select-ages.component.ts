import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-ages',
  templateUrl: './select-ages.component.html',
  styleUrls: ['./select-ages.component.scss']
})
export class SelectAgesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  orderConfirmation() {
    this.router.navigateByUrl('/orderConfirmation');
  }

}
