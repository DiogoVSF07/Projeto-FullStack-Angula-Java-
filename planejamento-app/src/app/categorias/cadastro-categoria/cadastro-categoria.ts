import { Component, OnInit, inject} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../categoria-service';
import { DadosCategoriaForm} from '../dados-categoria';
import { ValidatorsErrorResponse } from '../../common/validation/validation-error-model';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Header } from '../../common/components/header/header';

interface CadastroCategoriaForm {
  nome: FormControl<string>;
}

@Component({
  selector: 'app-cadastro-categoria',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, Header],
  templateUrl: './cadastro-categoria.html',
  styleUrl: './cadastro-categoria.scss',
})
export class CadastroCategoria implements OnInit{

  form!: FormGroup<CadastroCategoriaForm>;
  service = inject(CategoriaService);
  toast = inject(ToastrService);
  rotaAtiva = inject(ActivatedRoute);
  idCartaoEdicao?: string | null;

  ngOnInit(): void {
    this.form = new FormGroup<CadastroCategoriaForm>({
      nome: new FormControl('', {nonNullable: true, validators: Validators.required}),
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
    const dadosCategoria = this.form.value as DadosCategoriaForm;

    this.service.criar(dadosCategoria)
        .subscribe({
          next: (response) => {
            this.toast.success('Categoria cadastrada com sucesso!');
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