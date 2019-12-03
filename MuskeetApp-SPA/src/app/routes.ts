import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { CardWorkShopListComponent } from './carWorkShops/cardWorkShop-list/cardWorkShop-list.component';
import { CarWorkShopListResolver } from './_resolvers/carworkshop-list.resolver';
import { CarWorkShopEditResolver } from './_resolvers/carworkshop-edit.resolver';
import { CarWorkShopEditComponent } from './carWorkShops/carWorkShop-edit/carWorkShop-edit.component';


export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        children: [
            {path: 'members', component: MemberListComponent,
            resolve : {users: MemberListResolver}},

            {path: 'members/:id', component: MemberDetailComponent,
            resolve: {user: MemberDetailResolver}},

            {path: 'member/edit/:id', component: MemberEditComponent,
             resolve: {user: MemberEditResolver}},

            {path: 'carworkshops', component: CardWorkShopListComponent,
            resolve: {carWorkShops: CarWorkShopListResolver}},

            {path: 'carworkshop/edit/:id', component: CarWorkShopEditComponent,
            resolve: {carWorkShops: CarWorkShopEditResolver}}


        ]
    }
];
