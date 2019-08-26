import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { GetListComponent } from './Users/GetList/GetList.component';
import { MuskeetService } from './_services/muskeet.service';
import { UsersCardComponent } from './Users/usersCard/usersCard.component';

@NgModule({
   declarations: [
      AppComponent,
      GetListComponent,
      UsersCardComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule
   ],
   providers: [
     MuskeetService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
