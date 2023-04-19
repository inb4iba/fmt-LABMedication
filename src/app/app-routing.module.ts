import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { PatientComponent } from "./pages/patient/patient.component";
import { ConnectionGuard } from "./shared/guards/connection.guard";
import { MedicineComponent } from "./pages/medicine/medicine.component";
import { RecordComponent } from "./pages/record/record.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [ConnectionGuard],
    title: "Estatísticas e Informações",
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [ConnectionGuard],
    title: "Login",
  },
  {
    path: "patient",
    component: PatientComponent,
    canActivate: [ConnectionGuard],
    title: "Paciente",
    pathMatch: "full",
  },
  {
    path: "patient/register",
    component: PatientComponent,
    canActivate: [ConnectionGuard],
    title: "Cadastrar Paciente",
  },
  {
    path: "medicine",
    component: MedicineComponent,
    canActivate: [ConnectionGuard],
    title: "Medicamento",
    pathMatch: "full",
  },
  {
    path: "medicine/register",
    component: MedicineComponent,
    canActivate: [ConnectionGuard],
    title: "Cadastrar Medicamento",
  },
  {
    path: "record",
    component: RecordComponent,
    canActivate: [ConnectionGuard],
    title: "Histórico de Medicamentos",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
