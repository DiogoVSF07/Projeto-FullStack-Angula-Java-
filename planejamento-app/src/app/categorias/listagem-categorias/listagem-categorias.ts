import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria-service';
import { Observable } from 'rxjs';
import { PageResult } from '../../common/pagination/page-result';
import { DetalhesCategoria } from '../dados-categoria';
import { CommonModule } from '@angular/common';
import { Router, TitleStrategy, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Header } from '../../common/components/header/header';

@Component({
  selector: 'app-listagem-categorias',
  imports: [CommonModule, RouterLink, Header],
  templateUrl: './listagem-categorias.html',
  styleUrl: './listagem-categorias.scss',
})
export class ListagemCategorias implements OnInit{

  service = inject(CategoriaService);
  router = inject(Router);
  toast = inject(ToastrService);
  listagem$!: Observable<PageResult<DetalhesCategoria>>;
  paginaAtual = 0;
  tamanhoPagina = 10;

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias(){
    this.listagem$ = this.service.listar(this.paginaAtual, this.tamanhoPagina);
  }

  navegar(pagina: number){
    this.paginaAtual = pagina;
    this.listarCategorias();
  }

  navegarProximo(listagem: PageResult<DetalhesCategoria>){
    if(!listagem.last){
      this.navegar(listagem.number + 1);
    }
  }

  navegarAnterior(listagem: PageResult<DetalhesCategoria>){
    if(!listagem.first){
      this.navegar(listagem.number - 1);
    }
  }

  paginas(totalPaginas: number): number[] {
    return Array.from({ length: totalPaginas}, (valor, index) => index);
  }

  registroInicial(listagem: PageResult<DetalhesCategoria>){
    if(listagem.totalElements === 0){
      return 0;
    }
    return (listagem.number * listagem.size) +1;
  }

  registroFinal(listagem: PageResult<DetalhesCategoria>){
    if(listagem.totalElements === 0){
      return 0;
    }
    return Math.min(( listagem.number + 1) * listagem.size, listagem.totalElements);
  }

  prepararEdicao(idCartao: string){
    this.router.navigate(['/paginas/cadastro-categoria'], {
      queryParams:{
        id: idCartao
      }
    });
  }

  mudarStatus(idCartao: string){
    this.service.mudarStatus(idCartao)
      .subscribe(next => {
        this.toast.success('Registro realizado com sucesso');
        this.listarCategorias();
      });
  }
}
