package com.example.demo.domain.cartao.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "cartao")
public class CartaoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
   private UUID id;

}
