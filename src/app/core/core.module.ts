import { Title } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ConfirmationService } from 'primeng/components/common/api';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ToastyModule } from 'ng2-toasty'
import { JwtHelper } from 'angular2-jwt';

import { AuthService } from 'app/seguranca/auth.service';
import { ErrorHandleService } from './error-handle.service';
import { PessoaService } from 'app/pessoas/pessoas.service';
import { LancamentoService } from 'app/lancamentos/lancamento.service';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoriaService } from 'app/categorias/categoria.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule,
  ],
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    CategoriaService,
    ErrorHandleService,
    AuthService,

    ConfirmationService,
    JwtHelper,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ]
})
export class CoreModule { }
