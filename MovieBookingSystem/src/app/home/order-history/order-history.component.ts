import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
//import { bmsApiService } from '../../services/bmsapi.service';
import { bmsApiService } from 'src/app/services/bmsapi.service';
import { tempDataService } from '../../services/tempData.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  title:String;
  cost:String;
  useremail:any="";
  constructor(private router: Router,private bms: bmsApiService, private route:ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.useremail = (localStorage.getItem("user"));
    let cred:any = "";
    cred = {
      email: this.useremail
    }
    cred = JSON.stringify(cred);
    this.bms.getOrderHistory(cred).subscribe((res) => {
      console.log(res);
      // Total costs list
      let titles = res[0];
      let costs = res[1];
      this.title = titles[0];
      this.cost = costs[0];
      // Loop through the list of titles and print title and cost
      for (let i = 0; i < titles.length; i++) {
        console.log(titles[i]);
        console.log(costs[i]);
      }
    });
  }

}
