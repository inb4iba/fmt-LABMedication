import { Injectable } from "@angular/core";

let appointments: Array<IAppointment>;

export interface IMedicine {
  name: string;
  date: Date;
  time: string;
  type: string;
  amount: string;
  unit: string;
  observations: string;
}

interface IAppointment {
  medicine: IMedicine;
  patientID: number;
}

@Injectable({
  providedIn: "root",
})
export class AppointmentsService {
  constructor() {
    if (!localStorage.getItem("labmed_appointments")) {
      appointments = [];
      return;
    }

    appointments = JSON.parse(localStorage.getItem("labmed_appointments")!);
  }

  save(appointment: IAppointment) {
    appointments.push(appointment);
    localStorage.setItem("labmed_appointments", JSON.stringify(appointments));
  }
}
