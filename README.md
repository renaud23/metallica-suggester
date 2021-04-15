

# Creation des stores de suggestions.
Les données sont stockés dans une base indexedDB spécifique à chaque suggester. 2 stores et un index sont crées dans chaque base. L'utilisateur doit préciser, sur chaque objet proposé à l'indexation, un attribut id permettant d'identifier de manière unique l'objet au sein du store.
contenu des bases :
- store/entities : le store qui contient toute les entités proposées à la suggestion. Chaque entrée du store contient un objet de type : { id: string|number, suggestion: object, tokens: [string] }. id est l'identifiant de l'objet suggestion, entité proposé par l'utilisateur de la librairie. tokens est une liste de chaîne de caractères servant à constituer l'index recherche. Cette liste est crée selon les instruction fournit par l'utilisateur, lors de la création du store.
- store/info : contient un seul objet contenant les information utile à la création, l'indexation et durant les recherches des utilisateurs finaux.
Il contient seulement une seule entrée  :
{
    name:string,
    display:string|undefined,
    queryParser: { 
        type: 'soft'|'tokenized',
        params: {
            language:string,
            pattern:regex
        } | undefined
    }
    version: string|number
} 

name : le nom du suggester, utilisé pour créer l'index et l'utiliser ultérieurement, lors des recherches.
display: nom de l'attribut afficher lors des sélections. Par défaut, le champ id des entités proposées à l'indexation.
queryParser: précise la manière de traiter les requêtes de recherche, selon la nature de l'index crée. 
    - soft : supprime les accents, transforme les espaces en tirets. Utile pour la recherche sur préfixe.
    - tokenized : la recherche est tokenisée et lemmatisée selon la langue spécifiée et les l'expression régulière précisée dans les paramètres (params); Par défaut l'expression régulière est /[\w]+/. Permet la recherche sur plusieurs mot clef.

Lors de la création, un certain nombre d'informations utiles à la création de l'indexation doivent être transmis :
{
	name: string,
	fields: [
		{ name: string, rules: [regex]|'soft', language: string|undefined, min: number|undefined },
	],
	queryParser,// cf au dessus
	version,// cf au dessus
	display,// cf au dessus
};
fields précise la liste des attributs des objets devant être indéxé, ainsi que les modalité de traitements. Soft transforme le champ en chaîne de caractère et le prépare conformément au query parser 'soft'. rules contient une liste d'expression régulière permettant de découper la chaîne en unités léxicales. 
Si rules est un tableau de regex, une séries de filtres supplémentaire est appliqués pour transformer les unités léxicales :
    - filterStopWords : supprime les unités référencées dans une liste de mot à ignorer (liste en dure pour le moment et en français)
	- filterStemmer : extrait la racine léxicale de l'unité selon l'algorithme snowball, selon la langue précisée dans l'attribut language (par défaut, le français)
    - filterLength : taille minimum de conservation des unités léxicales.
A l'issu du processus d'indexation, chaque objet proposé est ajouté su store, avec son identifiant et la liste des tokens issus de l'étape d'indexation.


# Recherche
La fonction de recherche du suggester IDB utilise les données stockées dans le store store/info, pour traiter les requêtes des utilisateurs finaux.