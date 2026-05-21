# TaskFlow — TP5


## Lancer le projet

npm install
npm run api
npm run dev


## Comptes de test
- admin@taskflow.com / admin123
- ali@taskflow.com / ali123
- sara@taskflow.com / sara123

## Réponses

**Q1 — JSX et XSS**  
Non, le script ne s’exécute pas. React échappe les chaînes de caractères dans le JSX, donc le HTML est affiché comme du texte brut.

**Q2 — `dangerouslySetInnerHTML`**  
L’HTML est injecté dans le DOM et peut s’exécuter. C’est dangereux avec des données utilisateur ou venant d’une API non maîtrisée.

**Q3 — Header Authorization dans Network**  
Oui, après un login réussi, les requêtes vers l’API portent le header `Authorization: Bearer ...` grâce à l’intercepteur Axios.

**Q4 — Token en mémoire et pas dans `localStorage`**  
Le `localStorage` est accessible par n’importe quel script JavaScript de la page, donc plus exposé en cas de XSS. Le state Redux en mémoire est moins persistant et donc plus sûr.

**Q5 — Passage à Redux Toolkit**  
On passe d’un `switch/case` manuel à `createSlice`. Les reducers paraissent mutables, mais Redux Toolkit utilise Immer pour produire un nouvel état immuable en coulisse.

**Q6 — Re-renders au toggle de la sidebar**  
Avant optimisation, `Header`, `Sidebar` et `MainContent` se re-rendent quand la sidebar change. `MainContent` est celui qui ne devrait pas se re-rendre, car il ne dépend pas de `sidebarOpen`.

**Q7 — Pourquoi `MainContent` ne se re-rend plus**  
`React.memo` compare les props par comparaison superficielle. Comme `columns` garde la même référence quand la sidebar change, `MainContent` est ignoré.

**Q8 — `useMemo` vs `useCallback`**  
`useMemo` mémorise une valeur calculée. `useCallback` mémorise une fonction. On utilise `useCallback` pour garder stable une fonction passée en props.

**Q10 — Profiler**  
Cette partie dépend de vos mesures dans React DevTools. Il faut comparer avant / après `React.memo` et noter les temps de render observés dans votre environnement.

## Structure importante

- `src/api/axios.ts` : intercepteur token
- `src/features/auth/authSlice.ts` : auth Redux Toolkit
- `src/store.ts` : store Redux
- `src/hooks/useProjects.ts` : logique CRUD
- `src/components/Sidebar.tsx` : `React.memo`
- `src/components/MainContent.tsx` : `React.memo`
- `src/pages/Dashboard.tsx` : utilise le hook et Redux
- `src/pages/ProjectDetail.tsx` : logout Redux
- `src/main.tsx` : `Provider store={store}`
