import { Component, OnInit } from '@angular/core';


import { ErrorHandleService } from 'app/core/error-handle.service';
import { CategoriaService } from '../../categorias/categoria.service';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [
    { label: 'Alimentação', value: 1 },
    { label: 'Transporte', value: 2 },
  ];

  pessoas = [
    { label: 'João da Silva', value: 1 },
    { label: 'Sebastião Souza', value: 2 },
    { label: 'Maria Abadia', value: 3 },
  ];

  constructor(
    private categoriaService: CategoriaService, 
    private errorHandle: ErrorHandleService
    
    ) { }

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(error => this.errorHandle.handle(error));
  }

}
