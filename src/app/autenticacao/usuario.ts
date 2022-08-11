export class Usuario {
    cpf!: string;
    senha!: string;

    constructor (cpf:string, senha:string) {
        this.cpf = cpf;
        this.senha = senha;
    }
}