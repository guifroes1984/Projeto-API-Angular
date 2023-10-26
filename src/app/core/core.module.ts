import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationService } from 'primeng/components/common/api';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ToastyModule } from 'ng2-toasty';

import { ErrorHandleService } from './error-handle.service';
import { PessoaService } from 'app/pessoas/pessoas.service';
import { LancamentoService } from 'app/lancamentos/lancamento.service';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule,
  ],
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    ErrorHandleService,

    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ]
})
export class CoreModule { }
