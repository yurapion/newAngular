import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { MuskeetService } from '../../_services/muskeet.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-GetList',
  templateUrl: './GetList.component.html',
  styleUrls: ['./GetList.component.css']
})
export class GetListComponent implements OnInit {
  users: User[];
  constructor(private muskeetService: MuskeetService ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.muskeetService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      console.log(error);
    });
  }

}
