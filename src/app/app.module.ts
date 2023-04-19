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
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { MedicineComponent } from "./pages/medicine/medicine.component";
import { FormManagementComponent } from "./components/buttons/form-management-button/form-management-button.component";
import { MedicinePatientCardComponent } from "./components/cards/medicine-patient-card/medicine-patient-card.component";
import { RecordComponent } from './pages/record/record.component';
import { RecordPatientCardComponent } from './components/cards/record-patient-card/record-patient-card.component';
import { PadStartPipe } from './shared/pipes/pad-start.pipe';
import { RecordPatientMedicinesComponent } from './pages/record-patient-medicines/record-patient-medicines.component';

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
    MedicineComponent,
    FormManagementComponent,
    MedicinePatientCardComponent,
    RecordComponent,
    RecordPatientCardComponent,
    PadStartPipe,
    RecordPatientMedicinesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}
