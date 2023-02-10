//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
//components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarGraphicComponent } from './pages/bar-graphic/bar-graphic.component';

@NgModule({
  declarations: [
    AppComponent,
    BarGraphicComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
