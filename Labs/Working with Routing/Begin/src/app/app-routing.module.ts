import { NgModule } from '@angular/core';

/*

  TODO 1: Import Routing Symbols

  Import the following symbols from @angular/router:

  RouterModule
  Routes

*/
import {RouterModule,Routes} from '@angular/router';


/*

  TODO 2: Defining Root Fallback Routes

  Add the following routes into the app_routes constant below. 

  //Redirect empty route to /customers
  { path: '', pathMatch:'full', redirectTo: '/customers' },

  //Catch any unfound routes and redirect to home page
  { path: '**', pathMatch:'full', redirectTo: '/customers' } 


*/

const app_routes: Routes = [
  //Redirect empty route to /customers
  { path: '', pathMatch:'full', redirectTo: '/customers' },

  //Catch any unfound routes and redirect to home page
  { path: '**', pathMatch:'full', redirectTo: '/customers' } 

];

/*

  TODO 3: Adding Routes into the Module

  Add the following code into the NgModule decorator's imports property array:

    RouterModule.forRoot(app_routes)


*/
@NgModule({
  imports: [ RouterModule.forRoot(app_routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
