import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../autenticacao.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(
    private autenticacaoService : AutenticacaoService,
    private router : Router) { }

  ngOnInit(): void {
    this.autenticacaoService.logOut();
    this.router.navigate(['/login'])
  }

}
