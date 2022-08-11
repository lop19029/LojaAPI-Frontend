import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValidacaoResponse } from './model/validacao-response.model';

@Injectable({
  providedIn: 'root'
})
export class ValidacaoCPFService {

  constructor(private http : HttpClient) { }

  public validarCPF(cpf:string) : Observable<ValidacaoResponse> {
    return this.http.get<ValidacaoResponse>("https://api.invertexto.com/v1/validator?token=394|ZNQp4dy8MzZfqXDCdT2y3UE5MvUnXX4Y&value="+cpf+"&type=cpf");
  }

}
