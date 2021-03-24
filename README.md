# Creation des stores.

- function createFillStore(name, fields, queryParser, version, entities , log = () => null) : [launch : Function, terminate : Function]
- name : string
- fields : [{ name: string, rules: [regexp] | undefined, language: string | undfefined, min: number | undefined}]
- queryParser : { type: 'tokenized' | 'soft', params: { language: string | undefined, pattern: regexp | undefined } | undefined }
- version : string
- entities : [{ id: string | number, ...any }]
- log : Function

# Recherche
