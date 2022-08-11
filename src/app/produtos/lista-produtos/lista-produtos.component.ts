import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/shared/model/produto.model';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html'
})
export class ListaProdutosComponent implements OnInit {

  constructor(private produtoService : ProdutoService, private router : Router) { }

  public produtos!: Produto[];

  ngOnInit(): void {
    this.produtoService.obterProdutos()
      .subscribe({
        next: (pageable) => this.produtos = pageable.content,
        error: (err) => { console.log(err)
        //   if (err instanceof HttpErrorResponse) {
        //     if (err.error instanceof ErrorEvent) {
        //         console.error("Error Event");
        //     } else {
        //         console.log(`error status : ${err.status} ${err.statusText}`);
        //         switch (err.status) {
        //             case 403:     //forbidden
        //                 localStorage.removeItem('token');
        //                 this.router.navigate(['/login']);
        //                 break;
        //         }
        //     } 
        // } else {
        //     console.error("some thing else happened");
        // }
      }});
  }

}
