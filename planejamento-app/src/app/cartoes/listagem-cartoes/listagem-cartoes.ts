import { Component, inject, OnInit } from '@angular/core';
import { CartaoService } from '../cartao-service';
import { Observable } from 'rxjs';
import { PageResult } from '../../common/pagination/page-result';
import { DetalhesCartao } from '../dados-cartao';
import { CommonModule } from '@angular/common';
import { Router, TitleStrategy, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listagem-cartoes',
  imports: [CommonModule, RouterLink],
  templateUrl: './listagem-cartoes.html',
  styleUrl: './listagem-cartoes.scss',
})
export class ListagemCartoes implements OnInit{

  service = inject(CartaoService);
  router = inject(Router);
  toast = inject(ToastrService);
  listagem$!: Observable<PageResult<DetalhesCartao>>;
  paginaAtual = 0;
  tamanhoPagina = 10;

  ngOnInit(): void {
    this.listarCartoes();
  }

  listarCartoes(){
    this.listagem$ = this.service.listar(this.paginaAtual, this.tamanhoPagina);
  }

  navegar(pagina: number){
    this.paginaAtual = pagina;
    this.listarCartoes();
  }

  navegarProximo(listagem: PageResult<DetalhesCartao>){
    if(!listagem.last){
      this.navegar(listagem.number + 1);
    }
  }

  navegarAnterior(listagem: PageResult<DetalhesCartao>){
    if(!listagem.first){
      this.navegar(listagem.number - 1);
    }
  }

  paginas(totalPaginas: number): number[] {
    return Array.from({ length: totalPaginas}, (valor, index) => index);
  }

  registroInicial(listagem: PageResult<DetalhesCartao>){
    if(listagem.totalElements === 0){
      return 0;
    }
    return (listagem.number * listagem.size) +1;
  }

  registroFinal(listagem: PageResult<DetalhesCartao>){
    if(listagem.totalElements === 0){
      return 0;
    }
    return Math.min(( listagem.number + 1) * listagem.size, listagem.totalElements);
  }

  prepararEdicao(idCartao: string){
    this.router.navigate(['/paginas/cadastro-cartoes'], {
      queryParams:{
        id: idCartao
      }
    });
  }

  mudarStatus(idCartao: string){
    this.service.mudarStatus(idCartao)
      .subscribe(next => {
        this.toast.success('Registro realizado com sucesso');
        this.listarCartoes();
      });
  }
}
