import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../autenticacao.service';
import { Usuario } from '../usuario';
import { ValidacaoCPFService } from '../validacao-cpf.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  hasError = false;
  errorMessage = "";
  
  constructor(
    private formBuilder : FormBuilder,
    private service : AutenticacaoService,
    private validacaoService: ValidacaoCPFService,
    private router: Router) {}

  ngOnInit(): void {
    //Validate login data
    this.loginForm = this.formBuilder.group({
      cpf: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(11), Validators.maxLength(11)]],
      senha: ['', Validators.required]
    });
  }

  async onSubmit(){
    
    let usuario = new Usuario(this.loginForm.get('cpf')?.value, this.loginForm.get('senha')?.value);
    console.log(usuario);

    await this.validacaoService.validarCPF(usuario.cpf)
    .subscribe({
      next: (res) => {
        console.log(res);
        if(res.valid){
          this.hasError = false;
          this.errorMessage = "";
          this.autenticarUsuario(usuario);
        } else {
          this.hasError = true;
          this.errorMessage = "CPF inválido. Por favor, verifique os dados e tente novamente.";
          this.router.navigate(['/login']);
        }},
      error: (err) => console.log(err)
    });
  }

  async autenticarUsuario(usuario : Usuario){
    await this.service.autenticarUsuario(usuario).subscribe({
      next: (res) => {
        this.service.logIn(res.token),
        this.router.navigate(['/home']);
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.error instanceof ErrorEvent) {
              console.error("Error Event");
          } else {
              console.log(`error status : ${err.status} ${err.statusText}`);
              switch (err.status) {
                  case 403:     //forbidden
                      this.hasError = true;
                      this.errorMessage = "CPF ou Senha inválidos. Verifique e tente novamente.";
                      this.router.navigate(['/login']);
                      break;
              }
          } 
      } else {
          console.error("some thing else happened");
      }
      }
    });
    
  }





}
