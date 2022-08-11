import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../shared/model/produto.model';
import { ResponsePageable } from '../shared/model/response-pageable.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http : HttpClient) { }

  obterProdutos() : Observable<ResponsePageable> {
    return this.http
    .get<ResponsePageable>("http://localhost:8081/v1/produtos")
}

}
