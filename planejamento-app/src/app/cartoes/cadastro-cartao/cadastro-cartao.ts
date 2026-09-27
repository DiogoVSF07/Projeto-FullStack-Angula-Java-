import { Component, OnInit, inject} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartaoService } from '../cartao-service';
import { DadosCartaoFrom, DetalhesCartao } from '../dados-cartao';
import { ValidatorsErrorResponse } from '../../common/validation/validation-error-model';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

interface CadastroCartaoForm {
  nome: FormControl<string>;
  bandeira: FormControl<string>;
}

@Component({
  selector: 'app-cadastro-cartao',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './cadastro-cartao.html',
  styleUrl: './cadastro-cartao.scss',
})
export class CadastroCartao implements OnInit{

  form!: FormGroup<CadastroCartaoForm>;
  service = inject(CartaoService);
  toast = inject(ToastrService);
  rotaAtiva = inject(ActivatedRoute);
  idCartaoEdicao?: string | null;

  ngOnInit(): void {
    this.form = new FormGroup<CadastroCartaoForm>({
      nome: new FormControl('', {nonNullable: true, validators: Validators.required}),
      bandeira: new FormControl('', {nonNullable: true, validators: Validators.required })
    });
    this.carregarDadosParaEdicao();
  }

  carregarDadosParaEdicao(){
    this.idCartaoEdicao = this.rotaAtiva.snapshot.queryParamMap.get('id');

    if(!this.idCartaoEdicao){
      return
    }

    this.service
      .obterPorId(this.idCartaoEdicao)
      .subscribe({
        next: (cartao) => {
          this.form.patchValue({
            nome: cartao.nome,
            bandeira: cartao.bandeira
          })
        },
        error: () => this.toast.error('Erro ao carregar dados do cartão')
      });
  }

  isFormInvalid() : boolean {
    if(this.form.invalid){
      this.form.markAllAsTouched();
      this.toast.error('Erro de vaidação. Verifique os valores informados.');
      return true;
    }
    return false;
  }

  handleSubmit(){
    if(this.isFormInvalid()){
      return;
    }

    console.log(this.form.value);
    const dadosCartao = this.form.value as DadosCartaoFrom;

    const requisicao: Observable<DetalhesCartao | void> = this.idCartaoEdicao ? 
      this.service.atualizar(this.idCartaoEdicao, dadosCartao) : 
      this.service.criar(dadosCartao);

    requisicao
        .subscribe({
          next: (response) => {
            this.toast.success('Cartão cadastrado/atualizado com sucesso!');
            this.form.reset();
            this.idCartaoEdicao = null;
          },
          error: (error) => this.onApiError(error)
        });
  }

  private aplicarErrorValidation (error: ValidatorsErrorResponse) :void {
    error.camposInvalidos.forEach(ci => {
      const control = this.form.get(ci.campo);
      if(control){
        control.setErrors({aplicarError: ci.erro});
        control.markAsTouched();
      }
    })
  }

    private onApiError (response: any) : void {
        if(response.status === 422){
          this.aplicarErrorValidation(response.error);
          this.toast.error('Erro de validação. Verifique os valores informados.');
          return;
        }
      this.toast.error('Ocorreu um erro ao processar a requisição.');
      console.error(response.error);
    }
}