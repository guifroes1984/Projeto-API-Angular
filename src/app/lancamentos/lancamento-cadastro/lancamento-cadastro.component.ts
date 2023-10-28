import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


import { ErrorHandleService } from 'app/core/error-handle.service';
import { CategoriaService } from '../../categorias/categoria.service';
import { PessoaService } from '../../pessoas/pessoas.service';
import { Lancamento } from '../../core/model';




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

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento;

  constructor(
    private categoriaService: CategoriaService, 
    private pessoaService: PessoaService, 
    private errorHandle: ErrorHandleService
    
    ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: FormControl) {
    //console.log(this.lancamento);
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(error => this.errorHandle.handle(error));
  }

  carregarPessoas() {
    this.pessoaService.listarTodas() 
      .then(pessoas => {
        this.pessoas = pessoas.map(p => ({ label: p.nome, value:p.codigo }))
      })
      .catch(error => this.errorHandle.handle(error));
  }

}
