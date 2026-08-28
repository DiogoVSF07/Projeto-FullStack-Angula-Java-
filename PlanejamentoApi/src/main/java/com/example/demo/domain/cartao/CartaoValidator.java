package com.example.demo.domain.cartao;

import com.example.demo.common.validation.CampoInvalido;
import com.example.demo.common.validation.ValidationResult;
import com.example.demo.domain.cartao.dto.CartaoForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class CartaoValidator {

    @Autowired
    private CartaoRepository repository;

    public ValidationResult validar(CartaoForm form, UUID id){
        var result = ValidationResult.novo();

        var isListaNaoVazia = !repository.findByNomeAndNotId(form.nome(), id).isEmpty();
        if(isListaNaoVazia){
            result.add(new CampoInvalido("nome", "Já cadastrado."));
        }

        return result;
    }
}
