import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {bmsApiService} from '../services/bmsapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchText = "";
  constructor(private _bmsAs:bmsApiService) { }

  ngOnInit(): void {
    // //simple get api call
    // this._bmsAs.getcomments().subscribe(res=>
    //   {
    //     console.log(res," data from Api working")
    //   }
    // );
    // //get with parameter 
    // this._bmsAs.getcommentsByParameter(1).subscribe(res => {
    //   console.log(res," res from get params1")
    // });
    // //get with parameter within the url
    // this._bmsAs.getcommentsByParameter(1).subscribe(res => {
    //   console.log(res," res 2 from get params1  within url")
    // });

    // //post call
    // var opost = {
    //   userId : 5,
    //   id: 1,
    //   title: 'testTitle',
    //   body: 'testBody'
    // };
    // this._bmsAs.post(opost).subscribe(res=>{
    //   console.log(res," post method result");
    // });

    // //put call
    // var opost = {
    //   userId : 12345,
    //   id: 1,
    //   title: 'update title',
    //   body: 'update body'
    // };
    // this._bmsAs.post(opost).subscribe(res=>{
    //   console.log(res," put method result");
    // });
  }


search(evt:any) {
  this.searchText = evt;
}


}
