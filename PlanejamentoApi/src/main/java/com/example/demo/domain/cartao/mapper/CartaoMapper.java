package com.example.demo.domain.cartao.mapper;

import com.example.demo.domain.cartao.dto.CartaoDetalhes;
import com.example.demo.domain.cartao.dto.CartaoForm;
import com.example.demo.domain.cartao.model.CartaoEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CartaoMapper {

    CartaoEntity toEntity(CartaoForm form);

    CartaoDetalhes toDetalhes(CartaoEntity entity);

    void update(@MappingTarget CartaoEntity entity, CartaoForm dadosAtualizacao);
}
