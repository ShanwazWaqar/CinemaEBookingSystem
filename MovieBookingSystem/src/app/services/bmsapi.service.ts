import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class bmsApiService {
    baseUrl = "http://localhost:1785/api/";

    constructor(private httpClient: HttpClient) { }

    //checking api call
    //get method example without parameters 
    getcomments(): Observable<any> {
        return this.httpClient.get("https://jsonplaceholder.typicode.com/posts/1/comments");
    }

    //get method example with parameters
    getcommentsByParameter(postId:any): Observable<any> {
        let params1 = new HttpParams().set('postId',postId);
        return this.httpClient.get("https://jsonplaceholder.typicode.com/comments",{params:params1});
    }

    //get method example with parameters 2
    getcommentsByParameter2(postId:any): Observable<any> {
        return this.httpClient.get("https://jsonplaceholder.typicode.com/comments?postId="+postId);
    }

    //post example (creates a new entry)
    post(opost:any): Observable<any> {
        return this.httpClient.post("https://jsonplaceholder.typicode.com/posts",opost);
    }

     //put example (updates the existing entry)
     bmsput(opost:any): Observable<any> {
        return this.httpClient.post("https://jsonplaceholder.typicode.com/posts/"+opost.id,opost);
    }

    putdata(data:any): Observable<any> {
        console.log(this.baseUrl+"user",data);
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        console.log(headers," headers");
        return this.httpClient.post("http://localhost:9191/api/user",JSON.parse(data),{'headers':headers});
    }

    //login cred api call goes here
    validateUser(cred:any): Observable<any> {
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:1785/api/LoginUser",JSON.parse(cred),{'headers':headers});
    }

    //register user api name has to be changed.
    registerUser(user:any): Observable<any> {
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:1785/api/SignUp",JSON.parse(user),{'headers':headers});
    }

     //verify OTP
     verifyOTP(user:any): Observable<any> {
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:1785/api/verifyuser",JSON.parse(user),{'headers':headers});
    }

    verfiedUser(user:any): Observable<any> {
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:1785/api/sendstatus",JSON.parse(user),{'headers':headers});
    }

    changePassword(user:any): Observable<any> {
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:1785/api/updatepassword",JSON.parse(user),{'headers':headers});
    }

    getUserData(user:any): Observable<any> {
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:1785/api/getuserdetails",JSON.parse(user),{'headers':headers});
    }

    editProfile(user:any): Observable<any> {
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:1785/api/editprofile",JSON.parse(user),{'headers':headers});
    }

    forgotPasswordEmail(user:any): Observable<any> {
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:1785/api/verifyforgotpassword",JSON.parse(user),{'headers':headers});
    }

    forgotPasswordOTP(user:any): Observable<any> {
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:1785/api/forgotpasswordstat",JSON.parse(user),{'headers':headers});
    }

    updateforgotPassword(user:any): Observable<any> {
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:1785/api/fpasssucess",JSON.parse(user),{'headers':headers});
    }

    adminReg(user:any): Observable<any> {
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:1785/adm/newadmin",JSON.parse(user),{'headers':headers});
    }

    adminLogin(user:any): Observable<any> {
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:1785/adm/adminlogin",JSON.parse(user),{'headers':headers});
    }
    // add promotion api call
    addPromotion(promotion:any): Observable<any> {
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:1785/admin/addPromotion",JSON.parse(promotion),{'headers':headers});
    }

    addMovie(data:any): Observable<any> {
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:1785/admin/addmovie",JSON.parse(data),{'headers':headers});
    }

    scheduleMovie(data:any): Observable<any> {
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        return this.httpClient.post("http://localhost:1785/admin/schedulemovie",JSON.parse(data),{'headers':headers});
    }

    



}