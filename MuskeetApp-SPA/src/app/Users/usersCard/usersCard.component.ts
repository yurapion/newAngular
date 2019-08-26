import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/User';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-usersCard',
  templateUrl: './usersCard.component.html',
  styleUrls: ['./usersCard.component.css']
})
export class UsersCardComponent implements OnInit {
@Input() user: User;
  constructor() { }

  ngOnInit() {
    console.log(this.user);
  }

}
