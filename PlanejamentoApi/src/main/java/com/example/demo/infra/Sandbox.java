package com.example.demo.infra;

import com.example.demo.domain.cartao.CartaoRepository;
import com.example.demo.domain.cartao.model.BandeiraCartao;
import com.example.demo.domain.cartao.model.CartaoEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Sandbox implements CommandLineRunner {

    @Autowired
    private CartaoRepository repository;

    public void salvarCartao(){
        CartaoEntity cartao = new CartaoEntity();
        cartao.setNome("ITAU Personalité");
        cartao.setBandeira(BandeiraCartao.AMERICAN_EXPRESS);

        repository.save(cartao);
    }

    @Override
    public void run(String... args) throws Exception {
//        salvarCartao();
    }
}
