import { Component, OnInit } from '@angular/core';
import { CarWorkShop } from 'src/app/_models/CarWorkShop';
import { MuskeetService } from 'src/app/_services/muskeet.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-cardWorkShop-list',
  templateUrl: './cardWorkShop-list.component.html',
  styleUrls: ['./cardWorkShop-list.component.css']
})
export class CardWorkShopListComponent implements OnInit {

  carWorkShops: CarWorkShop[];
  constructor(private muskeetService: MuskeetService ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.muskeetService.getCarWorkShops().subscribe((carWorkShops: CarWorkShop[]) => {
      this.carWorkShops = carWorkShops;
    }, error => {
      console.log(error);
    });
  }
}
