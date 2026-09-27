package com.example.demo.domain.cartao.dto;

import com.example.demo.domain.cartao.model.BandeiraCartao;

import java.time.LocalDateTime;

public record CartaoDetalhes(
        String id,
        String nome,
        BandeiraCartao bandeira,
        LocalDateTime dataCadastro,
        Boolean ativo) {
}
