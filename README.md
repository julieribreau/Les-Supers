# Les Supers

Site statique indépendant, sans dépendance de compilation, sans lien avec Écrin.
Ouvrir `index.html` dans un navigateur pour consulter la maquette localement.

## Publication automatique

Le workflow `.github/workflows/deploy.yml` publie chaque modification poussée sur `main`.
Prérequis : un dépôt GitHub indépendant, par exemple `julieribreau/Les-Supers`, avec GitHub Pages configuré sur « GitHub Actions » dans Settings > Pages.
L'adresse attendue pour ce nom de dépôt est https://julieribreau.github.io/Les-Supers/ ; elle n'est pas encore publiée ni vérifiée.
Mettre les fichiers de ce dossier à la racine du dépôt. Le workflow ne publie que les cinq ressources du site.

## Collecte des intentions

Renseigner `formEndpoint` dans `config.js` avec l'URL HTTPS d'un formulaire acceptant un POST multipart et une réponse JSON (par exemple Formspree), puis publier.
Sans endpoint, l'envoi est désactivé et le visiteur est informé qu'aucune réponse n'est transmise.
Les réponses contiennent les shots sélectionnés, l'intention, le budget par shot, le sport facultatif et les paramètres UTM de campagne présents dans le lien d'entrée.
Aucun nom ni email n'est demandé. Ne pas saisir d'informations personnelles dans les paramètres UTM.
Vérifier les paramètres de confidentialité et de conservation du service de collecte choisi avant ouverture.

Les réponses « Oui, si la composition et le prix me conviennent » sont des intentions déclarées conditionnelles, pas des achats. Le prix n'étant pas fixé, cette première version mesure aussi le budget envisagé.
Aucun outil de comptage des visites n'est installé : on pourra analyser les réponses, mais pas calculer une conversion par visiteur sans mesure d'audience complémentaire.

## Vérifications

Ancres internes, unicité des identifiants, présence des fichiers et ordre des sections vérifiés par analyse HTML.
À vérifier dans un navigateur avant diffusion : affichage mobile et ordinateur, recherche, clavier, sélection des shots, envoi réussi et échec réseau avec le service de collecte réel.
Cette machine ne dispose pas de navigateur automatisable ou de Node pour ces vérifications.

## Contenu

Les bénéfices sont explicitement présentés comme des objectifs de formulation. Les compositions, les prix et les effets établis ne sont pas encore disponibles.
Les visuels des flacons sont des illustrations CSS de concept, sans images tierces ni polices externes.
