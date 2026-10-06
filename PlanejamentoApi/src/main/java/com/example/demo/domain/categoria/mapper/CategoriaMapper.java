package com.example.demo.domain.categoria.mapper;

import com.example.demo.domain.categoria.dto.CategoriaDetalhes;
import com.example.demo.domain.categoria.dto.CategoriaForm;
import com.example.demo.domain.categoria.model.CategoriaEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoriaMapper {

    CategoriaEntity toEntity(CategoriaForm nova);

    CategoriaDetalhes toDetalhes(CategoriaEntity entity);
}
