import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandleService } from 'app/core/error-handle.service';
import { CategoriaService } from '../../categorias/categoria.service';
import { PessoaService } from '../../pessoas/pessoas.service';
import { Lancamento } from '../../core/model';
import { LancamentoService } from '../lancamento.service';




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
  // lancamento = new Lancamento;
  formulario: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private errorHandle: ErrorHandleService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder

    ) { }

  ngOnInit() {
    this.configurarFormulario();

    const codigoLancamento = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo lançamento');

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: [ 'RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [ this.validarObrigatoriedade, this.validarTamanhoMinimo(5) ]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      observacao: []
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return(input.value ? null : { obrigatoriedade: true })
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        // this.lancamento = lancamento;
        this.formulario.patchValue(lancamento);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandle.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  adicionarLancamento() {
    //console.log(this.lancamento);
    this.lancamentoService.adicionar(this.formulario.value)
     .then(lancamentoAdicionado => {
        this.toasty.success('Lançamento adicionado com sucesso!');

        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
     })
     .catch(erro => this.errorHandle.handle(erro));
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
      .then(lancamento => {
        // this.lancamento = lancamento;
        this.formulario.patchValue(lancamento);

        this.toasty.success('Lançamento alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandle.handle(erro));
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

  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao').value}`);
  }
}
