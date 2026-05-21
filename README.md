## Installation

```bash
npm install
npm run api
npm run dev
```

## Comptes de test
- admin@taskflow.com / admin123
- ali@taskflow.com / ali123
- sara@taskflow.com / sara123

# Réponses TP3

## Q1
`<Navigate />` est utilisé dans le rendu d'un composant pour rediriger déclarativement. `navigate()` s'utilise dans un handler ou un effet.

## Q2
`navigate(from)` ajoute une nouvelle entrée dans l'historique. `navigate(from, { replace: true })` remplace l'entrée actuelle, donc le bouton Retour ne ramène pas vers `/login`.

## Q3
Après un POST, `setProjects(prev => [...prev, data])` met l'UI à jour immédiatement, évite une requête GET supplémentaire et garde une meilleure réactivité.

## Q4
- `/dashboard` sans être connecté : redirection vers `/login`
- `/projects/1` sans être connecté : redirection vers `/login`
- `/nimportequoi` : redirection vers `/dashboard`
- `/` : redirection vers `/dashboard`
- Connecté puis Retour : avec `replace: true`, on ne revient pas sur l'écran de login après connexion

## Q5
`<Link>` fait juste la navigation. `<NavLink>` sait aussi si le lien courant est actif, ce qui permet d'ajouter automatiquement un style actif. Ici il est utile pour surligner le projet sélectionné.

## Q6
Le composant est le même, mais :
- en POST on part souvent d'un formulaire vide et on crée un nouveau projet
- en PUT on pré-remplit le formulaire avec les données existantes puis on met à jour le projet ciblé

## Q7
Oui, si `json-server` est arrêté, Axios déclenche une erreur attrapée dans `catch`, puis le message est affiché dans l'interface.

## Q8
Avec Axios, lorsqu’une requête HTTP renvoie une erreur, comme une 404, la requête est considérée comme échouée et le traitement passe directement dans le bloc catch.