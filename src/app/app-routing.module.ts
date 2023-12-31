import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PessoasPesquisaComponent } from "./pessoas/pessoas-pesquisa/pessoas-pesquisa.component";
import { PaginaNaoEncontradaComponent } from "./core/pagina-nao-encontrada.component";
import { NaoAutorizadoComponent } from "./core/nao-autorizado.component";

const routes: Routes = [
  { path: 'lancamentos', loadChildren: 'app/lancamentos/lancamentos.module#LancamentosModule' },
  { path: 'pessoas', loadChildren: 'app/pessoas/pessoas.module#PessoasModule' },

  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

  @NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
