import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../_models/User';
import {CarWorkShop} from '../_models/CarWorkShop';
import {Appointment} from '../_models/Appointment';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class MuskeetService {
baseUrl = environment.apiUrl;
jwtHelper = new JwtHelperService();
decodedToken: any;
currentUser: User;
photoUrl =  new BehaviorSubject<string>('../../assets/user.png');
currentPhotoUrl = this.photoUrl.asObservable();
constructor(private http: HttpClient) { }

changeMemberPhoto(photoUrl: string) {
  this.photoUrl.next(photoUrl);
}

login (model: any) {
  return this.http.post(this.baseUrl + 'users/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.currentUser = user.user;
        }
      } )
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl + 'users');
}

getUser(id: any): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}

registerNewUser (user: User) {
  return this.http.post(this.baseUrl + 'users/register', user);
}

updateUser(id: number, user: User) {
  return this.http.put(this.baseUrl + 'users/' + id, user);
}

deleteUser(id: number) {
  return this.http.delete(this.baseUrl + 'users/' + id);
}



getCarWorkShops(): Observable<CarWorkShop[]> {
   return this.http.get<CarWorkShop[]>(this.baseUrl + 'carworkshop');
}

getCarWorkShop(id: any): Observable<CarWorkShop> {
  return this.http.get<CarWorkShop>(this.baseUrl + 'carworkshop/' + id);
}

registerCarWorkSHop(carWorkShop: CarWorkShop ) {
  return this.http.post(this.baseUrl + 'carworkshop/register', carWorkShop);
}

deleteCarWorkShop(id: number) {
  return this.http.delete(this.baseUrl + 'carworkshop/' + id);
}



getAppointments(): Observable<Appointment[]> {
  return this.http.get<Appointment[]>(this.baseUrl + 'appointment');
}

getAppointment(id: any): Observable<Appointment> {
  return this.http.get<Appointment>(this.baseUrl + 'appointment/' + id);
}

registerAppointment(appointment: Appointment ) {
  return this.http.post(this.baseUrl + 'appointment/register', appointment);
}

}
