# TPC1
## 2025-02-12

* **Nome** José Rafael de Oliveira Vilas Boas
* **Número** A76350
* **Foto** ![Foto](../foto.jpg)

## Introdução

Implementação de uma aplicalção web simples com ``json-server``, ``javascript`` e ``npm`` para resolução do TCP1 de engenharia web.

#### Objetivos

Ter as informações de uma oficina de reparações de carros disponível via a aplicação web.

Fazendo parsing de um dataset para extrair a informação necessária e organiza-la da forma pretendida.

Criando uma api para atender os pedidos, neste caso de listagem e consulta das entidades.

## Utilização

### Geração do dataset

Para gerar o dataset para ser utilizador, é preciso primeiro correr o programa [``json_parser``](json_parser.py) para dividir o dataset inicial [``dataset_reparacoes``](dataset_reparacoes.json) em 3 listas:

* Reparações
* Intervenções
* Veículos

Extraíndo essa informação do dataset inicial e compondo-a num novo dataset [``oficina``](oficina.json)

### Inicialização do servidor

Para iniciar o servidor primeiro é preciso iniciar o ``json-server`` com o seguinte comando:

``` bash
json-server --watch oficina.json --routes routes.json
```

De seguida, noutra janela do terminal, é preciso inicar o programa [``server``](server.js) com o seguinte comando:

``` bash
node server.js
```

A partir daqui a aplicação está iniciada ficando o [``server``](server.js) à escuta na porta 1234 do localhost

## Resultados

Com estes dois programas, [``json_parser``](json_parser.py) e [``server``](server.js), e utilização do ``json-server`` é então possível criar uma api que permite listar e consultar as diferentes entidades presentes no dataset [``oficina``](oficina.json).

Para além da listagem e consulta das entidades foram criadas mensagens com códigos de resposta para cada uma das operações possíveis de efetuar, permitindo assim informar caso a operação não seja permitida, não exista o conteúdo, o servidor não consiga responder ou que a operação foi efetuada com sucesso, estes incluem os códigos 405, 404, 500 e 200, respetivamente.
