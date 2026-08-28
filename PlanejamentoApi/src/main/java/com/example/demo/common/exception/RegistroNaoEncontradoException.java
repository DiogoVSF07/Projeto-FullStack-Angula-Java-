package com.example.demo.common.exception;

public class RegistroNaoEncontradoException extends RuntimeException {

  public RegistroNaoEncontradoException() {
    super("Registro não encontrado.");
  }
}
