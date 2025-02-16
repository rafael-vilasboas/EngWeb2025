import sys
import json
import os
import shutil

def open_json(filename):
    with open(filename,'r',encoding='utf-8') as file:
        data = json.load(file)
        # quando tenho o texto em vez do ficheiro
        # fileText = file.read()
        # data = json.loads(fileText)

    return data

def create_json(json_obj, filename):
    with open(filename, 'w', encoding='utf8') as file:
        json.dump(json_obj, file, indent=2, ensure_ascii=False)

json_obj = open_json('dataset_reparacoes.json')
map_reparacoes = {}
map_intervencoes = {}
map_veiculos = {}
lista_reparacoes = []
lista_intervencoes = []
lista_veiculos = []

for reparacao in json_obj['reparacoes']:
    # Reparações
    nif = reparacao['nif']

    if (nif not in map_reparacoes):
#        print(f'O cliente com nif {nif} já existe')
#    else:
        map_reparacoes[nif] = reparacao
        lista_reparacoes.append(reparacao)

    # Veículos
    veiculo = reparacao['viatura']
    matricula = veiculo['matricula']

    if (matricula not in map_veiculos):
#        print(f'O veículo com matrícula {matricula} já existe')
#    else:
        map_veiculos[matricula] = veiculo
        lista_veiculos.append(veiculo)

    # Intervenções
    for intervencao in reparacao['intervencoes']:
        codigo = intervencao['codigo']

        if (codigo not in map_intervencoes):
#            print(f'A intervenção com códgio {codigo} já existe')
#        else:
            map_intervencoes[codigo] = intervencao
            lista_intervencoes.append(intervencao)

oficina = {}
oficina['reparacoes'] = lista_reparacoes
oficina['intervencoes'] = lista_intervencoes
oficina['veiculos'] = lista_veiculos
create_json(oficina, 'oficina.json')
