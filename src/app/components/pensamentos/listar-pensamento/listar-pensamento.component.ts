import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {


  listaPensamentos: Pensamento[] = []
  paginaAtual: number = 1
  filtro: string = ''
  haMaisPensamentos: boolean = true
  favorito: boolean = false
  titulo: string = "Todos os pensamentos"
  listaFavorito: Pensamento[] = []

  constructor(private service: PensamentoService,
    private router: Router) { }

  ngOnInit() {
    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos;
    })
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual, this.filtro, this.favorito).
      subscribe((listaPensamentos) => {
        this.listaPensamentos.push(...listaPensamentos);
        if (!listaPensamentos.length) {
          this.haMaisPensamentos = false;
        }
      })
  }

  pesquisarPensamentos() {
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.service.listar(this.paginaAtual, this.filtro, this.favorito).
      subscribe(listaPensamentos => {
        this.listaPensamentos = listaPensamentos
      })
  }

  pensamentosFavoritos() {
    this.titulo = "Pensamentos favoritos"
    this.favorito = true
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.service.listar(this.paginaAtual, this.filtro, this.favorito).
      subscribe(listaPensamentosFavoritos => {
        this.listaPensamentos = listaPensamentosFavoritos
        this.listaFavorito = listaPensamentosFavoritos
      })
  }

  recarregarLista(){
    this.favorito = false
    this.paginaAtual = 1
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }
}
