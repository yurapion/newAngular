import { Component, OnInit } from '@angular/core';
import { MuskeetService } from '../_services/muskeet.service';
import {Router} from '@angular/router';
import { AlertifyService } from '../_services/Alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  id: number;
  constructor(private muskeetService: MuskeetService, private router: Router, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.muskeetService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.muskeetService.login(this.model).subscribe(next => {
      this.alertifyService.success('Logged in sucessfuly');
    }, error => {
 this.alertifyService.error(error);
    }, () => {
      this.photoUrl = this.muskeetService.currentUser.imageUrl;
      this.id = this.muskeetService.currentUser.id;
      this.router.navigate(['/members']);
    });
   }

   loggedIn() {
    // tslint:disable-next-line: comment-format
        //We have put the token in authService
        // Check if token exist and return true or false
        return this.muskeetService.loggedIn();
      }

      logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.muskeetService.decodedToken = null;
        this.muskeetService.currentUser = null;
        this.alertifyService.message('logged out');
        this.router.navigate(['/']);
      }

}
