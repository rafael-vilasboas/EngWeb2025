# TPC3
## 2025-02-25

**Nome** José Rafael de Oliveira Vilas Boas

**Número** A76350

**Foto** ![Foto](../foto.jpg)

## Introdução

Construção de um serviço em `nodejs`, [`alunos_server.js`](alunos_server.js), para servir um website com todas as operações CRUD utilizando a API de dados fornecida pelo `json-server`, que utiliza a informação contida no [`alunos.json`](alunos.json) com informação de alunos.

#### Características do website

* [**Página listar alunos**](#página-de-alunos):
  * Tabela com informação dos alunos
  * Cada linha permite aceder à **página de cada aluno**
  * Cada linha tem a opção de editar e remover um aluno
  * Opção de registar um novo aluno

* [**Página de um aluno**](#página-de-um-aluno)
  * Informação do aluno

## Utilização

### Inicialização do servidor

Iniciar o ``json-server`` com o seguinte comando:

``` bash
$ json-server --watch alunos.json
```

Inicar o servidor `nodejs` [``alunos_server``](alunos_server.js) com o seguinte comando:

``` bash
$ node alunos_server.js
```

Aplicação está iniciada ficando o [``alunos_server``](alunos_server.js) à escuta na porta 7777 do localhost

## Resultados

Na criação dos serviços no [`alunos_server`](alunos_server.js) é preciso distinguir cada tipo de pedido `GET`, `POST` e `DELETE` utiliza-se um `switch case` para distinguir e atender a cada tipo de pedido:

> [!NOTE]
> Cada um dos pedidos por sua vez faz um pedido ao `json-server` na porta 3000 para obtenção da informação necessária para concluir esse pedido, utilizando o módulo [`templates`](templates.js) para gerar a página web `html`

### **Página de alunos**

Pedido `GET` que apanha o url com o pedido `/alunos`

```js
    if (req.url === '/' || req.url === '/alunos') {
        axios.get('http://localhost:3000/alunos')
            .then(resp => {
                var alunos = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8;'})
                res.write(templates.studentsListPage(alunos, d))
                res.end()
            }).catch(erro => {...})
    }
```

Onde é feito o pedido da lista de todos os alunos à API do `json-server` sendo depois chamada a função `studentsListPage` para gerar a página

