import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CarWorkShop } from '../_models//CarWorkShop';
import { MuskeetService } from '../_services/muskeet.service';
import { AlertifyService } from '../_services/Alertify.service';
import {Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CarWorkShopListResolver implements Resolve<CarWorkShop> {
    constructor(private muskeetService: MuskeetService,
         private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<CarWorkShop>  {
        return this.muskeetService.getCarWorkShops().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}
