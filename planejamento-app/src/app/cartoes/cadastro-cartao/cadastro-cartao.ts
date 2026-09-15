import { Component, OnInit, inject} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartaoService } from '../cartao-service';
import { DadosCartaoFrom, DetalhesCartao } from '../dados-cartao';
import { ValidatorsErrorResponse } from '../../common/validation/validation-error-model';

interface CadastroCartaoForm {
  nome: FormControl<string>;
  bandeira: FormControl<string>;
}

@Component({
  selector: 'app-cadastro-cartao',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro-cartao.html',
  styleUrl: './cadastro-cartao.scss',
})
export class CadastroCartao implements OnInit{

  form!: FormGroup<CadastroCartaoForm>;
  service = inject(CartaoService);

  ngOnInit(): void {
    this.form = new FormGroup<CadastroCartaoForm>({
      nome: new FormControl('', {nonNullable: true, validators: Validators.required}),
      bandeira: new FormControl('', {nonNullable: true, validators: Validators.required })
    });
  }

  handleSubmit(){
    console.log(this.form.value);
    const dadosCartao = this.form.value as DadosCartaoFrom;
    this.service
        .criar(dadosCartao)
        .subscribe({
          next: (response: DetalhesCartao) => {
            console.log('recebendo a resposta do servidor:', response);
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
      this.(response.error);
      return;
    }
  }

}


