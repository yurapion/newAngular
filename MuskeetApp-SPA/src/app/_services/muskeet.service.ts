import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import {CarWorkShop} from '../_models/CarWorkShop';

@Injectable({
  providedIn: 'root'
})
export class MuskeetService {
baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }


getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl + 'users');
}

getUser(id: any): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}

updateUser(id: number, user: User) {
  return this.http.put(this.baseUrl + 'users/' + id, user);
}

getCarWorkShops(): Observable<CarWorkShop[]> {
   return this.http.get<CarWorkShop[]>(this.baseUrl + 'carworkshops');
}

}
