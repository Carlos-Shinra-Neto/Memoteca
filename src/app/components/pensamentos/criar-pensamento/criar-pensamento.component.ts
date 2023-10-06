import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
      ])],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      modelo: ['modelo1'],
      favorito: [false]
    })
  }

  criarPensamento() {
    if (this.formulario.valid) {
      this.service.criar(this.formulario.value).subscribe(() => {
        alert("Novo pensamento criado!")
        this.router.navigate(['/listarPensamentos'])
      })
    }
    else {
      alert('Esse formulário não é valido!')
    } 
  }

  cancelar() {
    alert("Ação cancelada!")
    this.router.navigate(['/listarPensamentos'])
  }

  habilitarBotao(): string{
    if(this.formulario.valid){
      return 'botao';
    } else {
      return 'botao__desabilitado'
    }
  }

}

