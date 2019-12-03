import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BsDropdownModule} from 'ngx-bootstrap';


import { AppComponent } from './app.component';
import { MuskeetService } from './_services/muskeet.service';
import { NavComponent } from './nav/nav.component';
import { AlertifyService } from './_services/Alertify.service';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { CarWorkShopListResolver } from './_resolvers/carworkshop-list.resolver';
import { CarWorkShopEditResolver } from './_resolvers/carworkshop-edit.resolver';

import {CarWorkShopCardComponent} from './carWorkShops/carWorkShop-card/carWorkShop-card.component';
import {CardWorkShopListComponent} from './carWorkShops/cardWorkShop-list/cardWorkShop-list.component';
import { CarWorkShopEditComponent } from './carWorkShops/carWorkShop-edit/carWorkShop-edit.component';

import { appRoutes } from './routes';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';




// tslint:disable-next-line: comment-format
//import {BsDropdownModule, TabsModule, BsDatepickerModule} from 'ngx-bootstrap';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      MemberListComponent,
      HomeComponent,
      RegisterComponent,
      CarWorkShopCardComponent,
      CardWorkShopListComponent,
      CarWorkShopEditComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      FormsModule,
      ReactiveFormsModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
             whitelistedDomains:  ['localhost:5000'],
             blacklistedRoutes: ['localhost:5000/api/auth']
         }
      }),
      BsDropdownModule.forRoot()
      // tslint:disable-next-line: comment-format
      // tslint:disable-next-line: comment-format
      //TabsModule.forRoot(),
   ],
   providers: [
      MuskeetService,
      AlertifyService,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      CarWorkShopListResolver,
      CarWorkShopEditResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
