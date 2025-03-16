import sys
import json

ficheiro = sys.argv[1]

with open(ficheiro, 'r', encoding='utf-8') as f:
    json_f = json.load(f)

i = 0
for entrada in json_f['filmes']:
    entrada['id'] = i
    i += 1

with open(ficheiro, 'w', encoding='utf-8') as f:
    json.dump(json_f, f, indent=2, ensure_ascii=False)
