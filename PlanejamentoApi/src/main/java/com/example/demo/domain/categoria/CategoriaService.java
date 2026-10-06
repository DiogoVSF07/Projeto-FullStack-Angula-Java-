package com.example.demo.domain.categoria;

import com.example.demo.common.exception.RegistroNaoEncontradoException;
import com.example.demo.common.exception.ValidationException;
import com.example.demo.common.validation.ValidationResult;
import com.example.demo.domain.categoria.dto.CategoriaDetalhes;
import com.example.demo.domain.categoria.dto.CategoriaForm;
import com.example.demo.domain.categoria.mapper.CategoriaMapper;
import com.example.demo.domain.categoria.model.CategoriaEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaValidator validator;
    @Autowired
    private CategoriaMapper mapper;
    @Autowired
    private CategoriaRepository repository;

    public CategoriaDetalhes criar(CategoriaForm nova) {
        ValidationResult result = validator.validar(nova);

        if(result.isInvalido()){
            throw new ValidationException(result.getCampoInvalidos());
        }

        CategoriaEntity entity = mapper.toEntity(nova);
        repository.save(entity);

        return mapper.toDetalhes(entity);
    }

    public Page<CategoriaDetalhes> listar(PageRequest pageRequest) {
        return repository
                .findAll(pageRequest)
                .map(mapper::toDetalhes);
    }

    @Transactional
    public void mudarStatus(UUID id) {
        var categoria = repository.findById(id)
                .orElseThrow(RegistroNaoEncontradoException::new);

        categoria.setAtivo(!categoria.getAtivo());
//        repository.save(categoria);
    } // commit -> SUCESSO | Rollback -> ERRO

    public List<CategoriaDetalhes> listarAtivas() {
        return repository.findByAtivoTrue()
                .stream()
                .map(mapper::toDetalhes)
                .toList();
    }

    public List<CategoriaDetalhes> listarTodas() {
        return repository.findAll(Sort.by("nome"))
                .stream()
                .map(mapper::toDetalhes)
                .toList();
    }
}
