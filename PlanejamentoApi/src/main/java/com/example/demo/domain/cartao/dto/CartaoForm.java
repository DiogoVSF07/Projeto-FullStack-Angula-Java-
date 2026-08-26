package com.example.demo.domain.cartao.dto;

import com.example.demo.domain.cartao.model.BandeiraCartao;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CartaoForm(
        @NotBlank(message = "Campo obrigatório.")
        String nome,
        @NotNull(message = "Campo obrigatório.")
        BandeiraCartao bandeira) {
}
