import { Component, OnInit, Input } from '@angular/core';
import { CarWorkShop } from 'src/app/_models/CarWorkShop';
import { MuskeetService } from 'src/app/_services/muskeet.service';
import { AlertifyService } from 'src/app/_services/Alertify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-carWorkShop-card',
  templateUrl: './carWorkShop-card.component.html',
  styleUrls: ['./carWorkShop-card.component.css']
})
export class CarWorkShopCardComponent implements OnInit {
  @Input() carWorkShop: CarWorkShop;

  constructor(private muskeetService: MuskeetService, private alertify: AlertifyService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log(this.carWorkShop);
  }

  delete() {
    console.log('here');
    this.muskeetService.deleteCarWorkShop(this.carWorkShop.companyId)
    .subscribe(() => {
      this.alertify.success('Deleted succesfuly');
    }, error => {
      this.alertify.error(error);
    }, () => {
    //   this.router.navigateByUrl('/members', { skipLocationChange: true }).then(() => {
    //     this.router.navigate(['mebmers']);
    // });
    window.location.reload();
    });
  }

}
