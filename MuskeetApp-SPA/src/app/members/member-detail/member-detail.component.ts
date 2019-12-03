import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { MuskeetService } from 'src/app/_services/muskeet.service';
import { AlertifyService } from 'src/app/_services/Alertify.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  constructor(private muskeetService: MuskeetService, private alertify: AlertifyService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // tslint:disable-next-line: comment-format
    //this.loadUser();
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  loadUser() {
    this.muskeetService.getUser(this.route.snapshot.params['id'])
    .subscribe((user: User) => {
      this.user = user;
    }, error => {
      this.alertify.error(error);
    });
  }

  delete() {
    console.log('here');
    this.muskeetService.deleteUser(this.route.snapshot.params['id'])
    .subscribe(() => {
      this.alertify.success('Deleted succesfuly');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }
}
