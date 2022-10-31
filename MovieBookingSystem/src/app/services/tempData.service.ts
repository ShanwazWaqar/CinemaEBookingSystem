import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { ConversionUtils } from 'turbocommons-ts';

@Injectable()
export class tempDataService {
  encryptSecretKey: string = "randomKey";

  encryptData(data: any) {
    // try {
    //   return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    // } catch (e) {
    //   console.log(e);
    // }
    var key = CryptoJS.enc.Utf8.parse(this.encryptSecretKey);
    var iv = CryptoJS.enc.Utf8.parse(this.encryptSecretKey);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data.toString()), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

    return encrypted.toString();
  }
  decryptData(data: any) {
    // try {
    //   const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
    //   if (bytes.toString()) {
    //     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    //   }
    //   return data;
    // } catch (e) {
    //   console.log(e);
    // }
    var key = CryptoJS.enc.Utf8.parse(this.encryptSecretKey);
    var iv = CryptoJS.enc.Utf8.parse(this.encryptSecretKey);
    var decrypted = CryptoJS.AES.decrypt(data, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  checkUser() {
    if (localStorage.getItem("loggedIn")) {
      return true
    } else {
      return false;
    }
  }

  
  encode(str:any) {
    return ConversionUtils.stringToBase64(str);
  }

  decode(str:any) {
    return ConversionUtils.base64ToString(str);
  }

}