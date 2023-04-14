import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { ConnectionService } from "../services/connection.service";

@Injectable({
  providedIn: "root",
})
export class ConnectionGuard implements CanActivate {
  constructor(
    private connectionService: ConnectionService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(route.url);
    if (
      !this.connectionService.isConnected() &&
      (!route.url.length || route.url[0].path !== "login")
    )
      this.router.navigate(["/login"]);

    if (
      this.connectionService.isConnected() &&
      route.url.length &&
      route.url[0].path === "login"
    )
      this.router.navigate(["/"]);

    return true;
  }
}