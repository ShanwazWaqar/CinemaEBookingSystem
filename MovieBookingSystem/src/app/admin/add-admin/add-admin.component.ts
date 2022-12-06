import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { bmsApiService } from 'src/app/services/bmsapi.service';
import { tempDataService } from 'src/app/services/tempData.service';
import { ErrorPopupComponent } from '../error-popup/error-popup.component';
import { MsgPopupComponent } from '../msg-popup/msg-popup.component';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,private router: Router,private bms:bmsApiService,private tds: tempDataService, private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]]
    });
  }

  

  errorPopup(msg:any) {
    const popup2 = this.dialogRef.open(ErrorPopupComponent, {
      disableClose: true,
      enterAnimationDuration: '700ms',
      exitAnimationDuration:'1000ms',
      maxHeight: '80vh',
      width: '400px',
      data: msg
    });
    popup2.afterClosed().subscribe(item =>{
      this.ngOnInit();
    });
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

  addAdmin() {
    console.log(this.loginForm.valid," valid status of form");
    if(this.loginForm.valid){
      let user:any;
      user = {
        email: this.loginForm.value.email,
        password: this.tds.encryptData(this.loginForm.value.password)
      }
      user = JSON.stringify(user);
      this.bms.adminReg(user).subscribe((res) => {
        console.log(JSON.stringify(res)," res");
        if(res) {
          this.sucessPopup("Admin Added Successfully!!!");
          this.ngOnInit();
        } else {
          // Server down popup
          this.errorPopup("Sorry something went wrong!!!")
        }
      });
    }
  }

}
