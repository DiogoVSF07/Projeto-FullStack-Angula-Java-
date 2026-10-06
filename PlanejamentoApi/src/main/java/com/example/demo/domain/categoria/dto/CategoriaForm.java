package com.example.demo.domain.categoria.dto;

import jakarta.validation.constraints.NotBlank;

public record CategoriaForm(
        @NotBlank(message = "Campo obrigatório.") String nome) {
}