# TPC4
## 2025-03-19

**Nome** José Rafael de Oliveira Vilas Boas

**Número** A76350

**Foto** ![Foto](../foto.jpg)

## Introdução

Criação de um servidor de alunos utilizando `mongoDB`, `express js` e `pug js` com funcionalidades de listagem, criação, edição e remoção de alunos.

## Características

* Página de alunos
  * Tabela com informação dos alunos
  * Possível aceder à página de cada aluno
  * Opção de registar um novo aluno
  * Opção de editar as informações de um aluno
  * Opção de apagar um aluno

* Página de um aluno
  * Informação do aluno
  * Listagem de tpcs completos do aluno

* Página registar novo aluno
  * Formulário que permita registar um novo aluno

* Página editar um aluno
  * Formulário pré preenchido que permita editar informações de um aluno

## Pré processamento

Para garantir que alunos possam ser corretamente importados para o mongoDB foi necessário alterar o [alunos.json](alunos.json) para a estrutura esperada pelo mongoDB

## Utilização

Instalar as dependências necessárias com

```bash
    $ npm install
```

Criar e correr um servidor mongo no docker com a imagem mongo, chamado mongoEW com uma base de dados chamada EW2025 e uma coleção chamada alunos, com a informação contida no [alunos.json](alunos.json)

  Criação de um docker container para o servidor mongo, mongoEW

  ```bash
      $ docker run -d -p 27017:27017 --name mongoEW -v mongoData2025:/data/db mongo
  ```

  Copiar o alunos.json para dentro do container

  ```bash
      $ docker cp alunos.json mongoEW:/tmp
  ```

  Entrar dentro do container

  ```bash
      $ docker exec -it mongoEW sh
  ```

  Criar a base de dados EW2025 com a coleção de alunos importando o alunos.json para o mongoEW

  ```bash
      $ mongoimport -d EW2025 -c alunos /tmp/alunos.json
  ```

Correr o servidor de alunos

```bash
    $ npm start
```
