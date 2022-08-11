import { Routes } from "@angular/router";
import { LoginComponent } from "./autenticacao/login/login.component";
import { LogoutComponent } from "./autenticacao/logout/logout.component";
import { ListaProdutosComponent } from "./produtos/lista-produtos/lista-produtos.component";
import { AuthGuard } from "./security/auth-guard";

export const rootRouterConfig: Routes = [
    {path:'', redirectTo: '/login', pathMatch: 'full'},
    {path:'login', component: LoginComponent},
    {path:'logout', component: LogoutComponent},
    {path:'home', component: ListaProdutosComponent, canActivate: [AuthGuard]},

    //Ir para login caso nenhuma pagina possa ser accessada
    { path: '**', redirectTo: '' }
]