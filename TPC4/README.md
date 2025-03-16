# TPC4
## 2025-03-12

**Nome** José Rafael de Oliveira Vilas Boas

**Número** A76350

**Foto** ![Foto](../foto.jpg)

## Introdução

Criação de um servidor de filmes utilizando `json-server`, `express js` e `pug js` com funcionalidades de listagem, criação, edição e remoção de filmes.

## Características

* Página inicial
  * Opção de listagem de filmes

* Página de filmes
  * Tabela com informação dos filmes
  * Lista de Atores envolvidos em cada filme
  * Possível aceder à página de cada ator envolvido num filme
  * Possível aceder à página de cada filme
  * Opção de registar um novo filme
  * Opção de editar as informações de um filme
  * Opção de apagar um filme

* Página de um filme
  * Informação do filme
  * Listagem de atores envolvidos no filme
  * Possível aceder à página de cada ator envolvido no filme

* Página de um ator
  * Informação do ator
  * Listagem de filmes em que o ator esteve envolvido
  * Possível aceder à página de cada filme em que o ator esteve envolvido

* Página registar novo filme
  * Formulário que permita registar um novo filme

* Página editar um filme
  * Formulário pré preenchido que permita editar informações de um filme

## Pré processamento

Para garantir que filmes possam ser editados foi necessário criar um programa [json_add_id](json_add_id.py) para atribuir um id a cada filme

## Utilização

Instalar as dependências necessárias com

```bash
    $ npm install
```

Correr o json-server

```bash
    $ json-server --watch cinema.json
```

Correr o servidor de filmes

```bash
    $ npm start
```
