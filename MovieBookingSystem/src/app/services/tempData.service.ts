import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class tempDataService {
    encryptSecretKey: string = "randomKey";

    encryptData(data: any) {
        try {
          return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
        } catch (e) {
          console.log(e);
        }
    }
    decryptData(data: any) {
        try {
          const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
          if (bytes.toString()) {
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          }
          return data;
        } catch (e) {
          console.log(e);
        }
    }

    checkUser() {
        if(localStorage.getItem("loggedIn")) {
            return true
        }else {
            return false;
        }
    }
}