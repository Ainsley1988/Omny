import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';

export const routes: Routes = [

{ path:'', component:HomeComponent,pathMatch:'full'},
{ path:'card/:serialNumber/:cardType', component:CardComponent},
{path:'**',redirectTo:''}




];
