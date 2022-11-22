import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { bmsApiService } from 'src/app/services/bmsapi.service';
import { MsgPopupComponent } from '../msg-popup/msg-popup.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  filterText: any = "";
  tempUsers:any = [];
  users:any= [];
  constructor(private bms: bmsApiService, private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.tempUsers = this.users;
    //api call for get all users
    this.bms.getAllusers().subscribe(res=>{
      console.log(res," res ");
      this.users = res;
      this.tempUsers = this.users;
    });
  }

  status: any= [
    {value: 'Suspend', viewValue: 'Suspend'},
    {value: 'Active', viewValue: 'Active'}
  ];

  ngOnChanges() {
    console.log(this.filterText," filte etxt")
  }

  filter(evt:any) {
    console.log("filter -> ",this.filterText," ",evt);
    this.users = [];
    for(let i=0;i<this.tempUsers.length;i++) {
      if(this.tempUsers[i].gmail.includes(this.filterText)) {
        this.users.push(this.tempUsers[i]);
      }
    }
  }

  changestatus(evt:any,user:any) {
    console.log(evt.value," ",user.email);
    let status = 0;
    if(evt.value == "Active") {
      status = 1;
    } else {
      status = 0;
    }
    let obj:any = {
      email: user.email,
      userstatus: status
    }
    obj = JSON.stringify(obj);
    this.bms.setUserStatus(obj).subscribe(res=> {
      if(res) {
        this.sucessPopup("User Status Changed Successfully!")
      }
    })
  }

  sucessPopup(msg:any) {
    const popup2 = this.dialogRef.open(MsgPopupComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration:'1000ms',
      maxHeight: '80vh',
      width: '400px',
      data: msg
    });
    popup2.afterClosed().subscribe(item =>{
      location.reload();
    });
  }

}
