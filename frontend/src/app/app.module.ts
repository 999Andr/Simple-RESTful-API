import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoodComponent } from './good/good.component';
import { FirstComponent } from './first/first.component';
import { GoodDetailComponent } from './good-detail/good-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [
    AppComponent,
    GoodComponent,
    FirstComponent,
    GoodDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
