# API Rest

## Normalisation de la requête

Il y a 3 normes a respecter pour exécuter ou implémenter une requête HTTP vers une API Rest

### Verbe/méthode HTTP

[Documention MDN sur les méthodes HTTP](https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Methods)

On a accès a 5 verbes HTTP :

- GET : récupération (read)
- POST : insertion (create)
- PUT : insertion/remplacement (create/update)
- PATCH : modification partielle (update)
- DELETE : suppression (delete)

 Ces 5 verbes nous permettent de mettre en place un CRUD (Create Read Update Delete)

### Ressource

 L'url (la route) esr toujours composé par une ressource au pluriel, en général celle-ci représente une entité du système d'information.

### L'identifiant

L'url contient potentiellement un identifiant en 2eme partie de route (derrère la ressource) qui pointe vers une instance/enregistrement particulière.

On peut l'utiliser avec GET, PUT, PATCH, et DELETE.

## Normalisation de la réponse

Elle est composée de 2 parties principales

### Code de status

[Liste de status](https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Status)

La liste est plutôt ^parlante sur le site de MDN, donc vous y référer.

### Le corp de la réponse

La réponse sera en général en JSON.

On a 2 possibilités pour la réponse :

- Soit on renvoi directement les données
- Soit on les fournis dans une enveloppe

Une enveloppe est une propriété qui est spécialisé. Cela peut être pour specifier :

- Des données (En général "data")
- Des erreurs (En général en "errors")
- La pagination ("page" ou "start" + "count" ou "limit")
- Le nombre total d'instances/enregistrements ("count" ou "total")
- Ou plus d'infos

Ces infos ne sont pas exclusives.

Il est possible d'avoir des exception de route, afin d'implémenter une route particulière. Mais attention votre API ne sera plus considéré comme une API Rest, mais plus comme une hybride.
