import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoodComponent } from './good/good.component';
import { FirstComponent } from './first/first.component';
import { GoodDetailComponent } from './good-detail/good-detail.component';

const routes: Routes = [ 
  {path: '',  redirectTo: '/good', pathMatch: 'full'},
  {path: 'good', component: GoodComponent},
  { path: 'detail/:id', component: GoodDetailComponent },
  {path: 'first', component: FirstComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
