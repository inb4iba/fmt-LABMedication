import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { LoginComponent } from "./pages/login/login.component";
import { ToastAlertComponent } from "./components/toast-alert/toast-alert.component";
import { RegisterComponent } from "./pages/login/register/register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./pages/home/home.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { PatientCardComponent } from "./components/cards/patient-card/patient-card.component";
import { SearchInputComponent } from "./components/search-input/search-input.component";
import { StatsCardComponent } from "./components/cards/stats-card/stats-card.component";
import { PatientComponent } from "./pages/patient/patient.component";
import { provideEnvironmentNgxMask } from "ngx-mask";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToastAlertComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent,
    ToolbarComponent,
    PatientCardComponent,
    SearchInputComponent,
    StatsCardComponent,
    PatientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [provideEnvironmentNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}
