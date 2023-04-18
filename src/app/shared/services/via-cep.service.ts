import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface IAddressInfo {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

@Injectable({
  providedIn: "root",
})
export class ViaCEPService {
  private baseUrl = "https://viacep.com.br/ws";

  constructor(private http: HttpClient) {}

  getAddressFromCEP(cep: string | number) {
    console.log(`${this.baseUrl}/${cep}/json`);
    return this.http.get<IAddressInfo>(`${this.baseUrl}/ws/${cep}/json`, {
      responseType: "json",
    });
  }
}
