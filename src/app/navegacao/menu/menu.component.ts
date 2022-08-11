import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  loggedIn !: boolean;
  constructor(private autenticacaoService : AutenticacaoService) { }

  ngOnInit(): void {
    this.autenticacaoService.isLoggedIn().subscribe(
      loggedIn => this.loggedIn = loggedIn
    )
  }

}
