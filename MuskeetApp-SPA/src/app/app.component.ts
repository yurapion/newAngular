import { Component, OnInit } from '@angular/core';
import { MuskeetService } from './_services/muskeet.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  jwtHelper = new JwtHelperService();

  constructor(private muskeetService: MuskeetService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
    this.muskeetService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.muskeetService.currentUser = user;
      this.muskeetService.changeMemberPhoto(user.imageUrl ? user.imageUrl : '../../assets/user.png');
    }
  }
}

