# TPC2
## 2025-02-18

**Nome** José Rafael de Oliveira Vilas Boas

**Número** A76350

**Foto** ![Foto](../foto.jpg)

## Introdução

Construção de um serviço em `nodejs`, [`escola-musica-server.js`](escola-musica-server.js), para servir um website com utilização da API de dados fornecida pelo `json-server`, que utiliza a informação contida no [`db.json`](db.json) da escola de música.

#### Características do website

* [**Página principal**](#página-inicial) que permite aceder às páginas de:
  * **Listar alunos**
  * **Listar cursos**
  * **Listar instrumentos**

* [**Página listar alunos**](#página-de-alunos):
  * Tabela com informação dos alunos
  * Cada linha permite aceder à **página de cada aluno**

* [**Página listar cursos**](#página-de-cursos):
  * Tabela com informação dos cursos
  * Cada linha permite aceder à **página de cada curso**

* [**Página listar instrumentos**](#página-de-instrumentos):
  * Tabela com informação dos instrumentos
  * Cada linha permite aceder à **página de cada instrumento**

* [**Página de um aluno**](#página-de-um-aluno)
  * Informação do aluno

* [**Página de um curso**](#página-de-um-curso)
  * Informação do curso
  * Lista de alunos que frequentam o curso

* [**Página de um instrumento**](#página-de-um-instrumento)
  * Informação do instrumento
  * Lista de alunos que tocam esse instrumento

## Utilização

### Inicialização do servidor

Iniciar o ``json-server`` com o seguinte comando:

``` bash
$ json-server --watch db.json
```

Inicar o servidor `nodejs` [``escola-musica-server``](escola-musica-server.js) com o seguinte comando:

``` bash
$ node escola-musica-server.js
```

Aplicação está iniciada ficando a [``escola-musica-server``](escola-musica-server.js) à escuta na porta 1234 do localhost

## Resultados

Na criação dos serviços na [`escola-musica-server`](escola-musica-server.js) como estamos a considerar que todos os pedidos são de `GET` utiliza-se um `if` para distinguir e atender a cada tipo de pedido:

> [!NOTE]
> Cada um dos pedidos de páginas de entidades por sua vez faz um pedido ao `json-server` na porta 3000 para obtenção da informação necessária, para que possa passar a informação à função correspondente do módulo [`paginas`](paginas.js) que gera a página web `html`

### **Página inicial**

Que apanha o url com o pedido `/`

```js
if (req.url == '/') {...}
```

Não é feito nenhum pedido à API do `json-server` sendo diretamente chamada a função `genMainPage` para gerar a página

### **Pedido do ficheiro de css**

Que apanha todos os urls terminados em `w3.css`

```js
else if (req.url.match(/w3\.css$/)) {...}
```

Sendo enviado o conteúdo do ficheiro [`css`](w3.css) no `res.end(dados)`

> [!NOTE]
> Este pedido está posicionado nos primeiros testes do `if` para que possa ser atendido por páginas mais profundas

### **Pedido da imagem de icon da página**

Que apanha todos os urls terminados em `favicon.ico`

```js
else if (req.url.match(/favicon\.ico$/)) {...}
```

Sendo enviada a imagem [`icon`](icon.png) no `res.end(dados)`

> [!NOTE]
> Este pedido está posicionado nos primeiros testes do `if` para que possa ser atendido por páginas mais profundas

### **Página de alunos**

Que apanha o url com o pedido `/alunos`

```js
else if (req.url == '/alunos') {
    axios.get('http://localhost:3000/alunos')
        .then(function(resp) {
            var alunos = resp.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(genAlunosPage(alunos, d))
            res.end()
        }).catch(erro => {...})
    }
```

Onde é feito o pedido da lista de todos os alunos à API do `json-server` sendo depois chamada a função `genAlunosPage` para gerar a página

### **Página de cursos**

Que apanha o url com o pedido `/cursos`

```js
else if (req.url == '/cursos') {
    axios.get('http://localhost:3000/cursos')
        .then(function(resp) {
            var cursos = resp.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(genCursosPage(cursos, d))
            res.end()
        }).catch(erro => {...})
    }
```

Onde é feito o pedido da lista de todos os cursos à API do `json-server` e depois chamada a função `genCursosPage` para gerara a página

### **Página de instrumentos**

Que apanha o url com o pedido `/instrumentos`

```js
else if (req.url == '/instrumentos') {
    axios.get('http://localhost:3000/instrumentos')
        .then(function(resp) {
            var instrumentos = resp.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(genIntrumentosPage(instrumentos, d))
            res.end()
        }).catch(erro => {...})
    }
```

Onde é feito o pedido da lista de todos os instrumentos à API do `json-server` e depois chamada a função `genInstrumentosPage` para gerar a página

### **Página de um aluno**

Que apanha todos os urls que terminam em `aluno/` seguidos de uma ou mais ocorrências de qualquer caractere

```js
else if (req.url.match(/aluno\/.+$/)) {
    // pegar no id do aluno
    var id = req.url.split("/")[2]
    // pedido do aluno com esse id
    axios.get('http://localhost:3000/alunos?id={id}')
        .then(function(resp) {
            var aluno = resp.data[0]
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write(genAlunoPage(aluno, d))
            res.end()
        }).catch(erro => {...})
    }
```

Onde é feito o pedido do aluno com o id presente no url à API do `json-server` e depois chamada a função `genAlunoPage` para gerar a página

### **Página de um curso**

Que apanha todos os urls que terminam em `curso/` seguidos de uma ou mais ocorrências de qualquer caractere

```js
else if (req.url.match(/curso\/.+$/)) {
    // pegar no id do curso
    var id = req.url.split("/")[2]
    // pedido do curso com esse id
    axios.get('http://localhost:3000/cursos?id={id}')
        .then(function(resp) {
            var curso = resp.data[0]
            // pedido dos alunos que frequentam esse curso
            axios.get(`http://localhost:3000/alunos?curso=${id}`)
                .then(function(resp) {
                    var alunos = resp.data
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(genCursoPage(curso, alunos, d))
                    res.end()
            }).catch(erro => {...})
        }).catch(erro => {...})
    }
```

Aqui é primeiro feito o pedido do curso com o id presente no url à API do `json-server`, depois de recibida a resposta dentro desse mesmo pedido é feito novamente outro pedido dos alunos que frequentam esse curso à API do `json-server`, só depois de receber a resposta deste è então chamada a função `genAlunoPage` para gerar a página

> [!IMPORTANT]
> É necessário que o pedido dos alunos que frequentam o curso seja feito dentro da função do pedido inicial, que responde ao pedido do curso, para que sejam devidamente efetuados os resultados dos pedidos, devido a tratarem-se de pedidos assíncronos

### **Página de um instrumento**

Que apanha todos os urls terminados em `/instrumento` seguidos de uma ou mais ocorrências de qualquer caractere

```js
else if (req.url.match(/instrumento\/.+$/)) {
    // pegar no id do instrumentp
    var id = req.url.split("/")[2]
    // pedido do instrumento com esse id
    axios.get('http://localhost:3000/intrumentos?id={id}')
        .then(function(resp) {
            var instrumento = resp.data[0]
            // pedido dos alunos que tocam esse instrumento
            axios.get(`http://localhost:3000/alunos?instrumento=${instrumento["#text"]}`)
                .then(function(resp) {
                    var alunos = resp.data
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(genInstrumentoPage(instrumento, alunos, d))
                    res.end()
            }).catch(erro => {...})
        }).catch(erro => {...})
    }
```

Aqui também é primeiro feito o pedido do instrumento com o id presente no url à API do `json-server`, depois de recibida a resposta, dentro desse mesmo pedido, é feito novamente outro pedido dos alunos que tocam esse instrumento à API do `json-server`, só depois de receber a resposta deste è então chamada a função `genInstrumentoPage` para gerar a página

> [!IMPORTANT]
> É necessário que o pedido dos alunos que tocam o instrumento seja feito dentro da função do pedido inicial, que responde ao pedido do instrumento, para que sejam devidamente efetuados os resultados dos pedidos, devido a tratarem-se de pedidos assíncronos
