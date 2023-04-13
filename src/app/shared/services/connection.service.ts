import { Injectable } from "@angular/core";

let users: Array<IUser>;

export interface IUser {
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class ConnectionService {
  constructor() {
    if (!localStorage.getItem("labmed_users")) {
      users = new Array<IUser>();
      return;
    }

    users = JSON.parse(
      localStorage.getItem("labmed_users")!
    ) satisfies Array<IUser>;
  }

  registerUser(user: IUser) {
    users.push(user);
    localStorage.setItem("labmed_users", JSON.stringify(users));
  }

  // isUniqueUser(newUser: IUser) {
  //   return users.some((user) => user.email === newUser.email);
  // }
}
