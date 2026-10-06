package com.example.demo.domain.categoria;

import com.example.demo.domain.categoria.model.CategoriaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CategoriaRepository extends JpaRepository<CategoriaEntity, UUID>{

    boolean existsByNome(String nome);
    List<CategoriaEntity> findByAtivoTrue();

}
