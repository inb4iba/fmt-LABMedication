import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { ToastAlertComponent } from "./components/toast-alert/toast-alert.component";
import { RegisterComponent } from "./pages/login/register/register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToastAlertComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
