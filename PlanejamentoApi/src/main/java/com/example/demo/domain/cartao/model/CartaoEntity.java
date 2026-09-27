package com.example.demo.domain.cartao.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "cartao")
public class CartaoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column
    private UUID id;

    @Column(name = "nome", nullable = false, length = 30)
    private String nome;

    @Column(name = "bandeira")
    @Enumerated(EnumType.STRING)
    private BandeiraCartao bandeira;

    @Column(name = "data_cadastro")
    private LocalDateTime dataCadastro;

    @Column(name = "ativo")
    private Boolean ativo = true;

    @PrePersist
    public void prePersist(){
        setDataCadastro(LocalDateTime.now());
    }

}
