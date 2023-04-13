import { Injectable } from "@angular/core";

let users: Array<IUser>;

export interface IUser {
  email?: string | null;
  password?: string | null;
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

  login(loginUser: IUser): { message: string } | null {
    let userExist = false;
    const connected = users.some((user) => {
      userExist = userExist || user.email === loginUser.email;
      return (
        user.email === loginUser.email && user.password === loginUser.password
      );
    });

    if (connected) localStorage.setItem("labmed_connected", loginUser.email!);

    return !connected
      ? userExist
        ? { message: "Senha incorreta!" }
        : { message: "Usuário não existe!" }
      : null;
  }

  registerUser(user: IUser) {
    users.push(user);
    localStorage.setItem("labmed_users", JSON.stringify(users));
  }

  // isUniqueUser(newUser: IUser) {
  //   return users.some((user) => user.email === newUser.email);
  // }
}
