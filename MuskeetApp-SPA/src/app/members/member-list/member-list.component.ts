import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { MuskeetService } from 'src/app/_services/muskeet.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  constructor(private muskeetService: MuskeetService, private route: ActivatedRoute ) { }

  ngOnInit() {
    // tslint:disable-next-line: comment-format
    //before resolver
    // tslint:disable-next-line: comment-format
    //this.loadUsers();
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });

  }

  // loadUsers() {
  //   this.muskeetService.getUsers().subscribe((users: User[]) => {
  //     this.users = users;
  //   }, error => {
  //     console.log(error);
  //   });
  // }
}
