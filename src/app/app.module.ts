import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ToastAlertComponent } from './components/toast-alert/toast-alert.component';
import { RegisterComponent } from './pages/login/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToastAlertComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
