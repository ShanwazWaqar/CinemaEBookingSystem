import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class bmsApiService {
    baseUrl = "http://localhost:8081/";

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

    validateUser(cred:any): Observable<any> {
        const headers= new HttpHeaders().set('content-type', 'application/json;charset=utf-8').set('Access-Control-Allow-Origin', '*');
        return this.httpClient.put("http://localhost:9191/api/user",JSON.parse(cred),{'headers':headers});
    }


}