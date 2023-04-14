import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { ConnectionGuard } from "./shared/guards/connection.guard";

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
