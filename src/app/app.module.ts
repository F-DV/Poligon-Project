//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
//components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarGraphicComponent } from './pages/bar-graphic/bar-graphic.component';
import { NavParametersComponent } from './components/nav-parameters/nav-parameters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestComponentComponent } from './components/test-component/test-component.component';

@NgModule({
  declarations: [
    AppComponent,
    BarGraphicComponent,
    NavParametersComponent,
    TestComponentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
