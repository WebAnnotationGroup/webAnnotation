# Web Annotation

Web Annotation abrégé WA  est une librairie/outil qui permet d'annoter des images.

Annoter une image c'est créer une ou plusieurs annotations sur l'image.
Une annotation est constituée d'un marquage (ensemble de points qui créés un forme comme un rond, un carré, un rectangle, un polygone, ...) et d'une description textuelle associée à ce marquage.

L'application Web Annotation se découpe en trois parties :
* La page d'accueil permet de charger une image normale ou annotée.
* L'éditeur WA permet d'annoter une image.
* La visionneuse WA permet de visionner les annotations d'une image.

### Auteurs
* Mathieu Guyot (lead dev) -> mathieuguyot40@yahoo.fr
* Loïc Favrelière (dev) -> loic79.favreliere@gmail.com
* Cyrille Suire (initiateur du projet WA) -> cyrille.suire@univ-lr.fr
* Axel Jean-Caurant (initiateur du projet WA) -> axel.jean-caurant@univ-lr.fr

### Version
1.0.0

### Technologies

WA utilise les technologies suivantes

* [React] React nous permet de créer les composants graphiques de l'app.
* [Openlayers3] Openlayers est utilisé pour manipuler les images.
* [Redux] l'app WA utilise l'architecture redux
* [Babel] L'app WA est écrite en ES6, donc nous avons besoin de Babel
* [Browserify] L'app WA est écrite en ES6, donc nous avons besoin de Browserify
* [Gulp] On build l'app WA avec Gulp
* [JQuery] Certaines fonctions de JQuery sont utilisées dans l'app.

### Installation

Vous avez besoin de gulp intallé globalement.
```sh
$ npm i -g gulp
```

```sh
$ sudo npm i
```

Noter que l'installation de openlayers via npm est assez capricieuse...
Attention donc à bien vérifier votre version de npm, vider le cache npm et éxecuter la commande d'installation en administrateur.

### Développement

Vous voulez nous aider à développer webAnnotation ? Super !
Web Annotation utilise gulp pour un développement rapide.
Lancer la commande pour builder le projet (si la commande reste active, toute modification d'un script rebuild automatiquement le projet).

```sh
$ sudo gulp
```

### Arbo de fichiers

Voici comment s'organise l'arbo de fichiers de l'app WA:

```sh
webAnnotation
-app...............dossier racine de l'app
--font.............polices de l'app
--images...........images de l'app
--jsExternal.......scripts js externes à l'app
--scripts..........dossier qui contient les scripts js de notre app
---actions.........dossier qui contient toutes les actions de l'app (REDUX)
---components......dossier qui contient tous les composants de l'app (REACT)
----imgAnLib.......dossier qui contient le composant librairie de l'app
----imgAnTools.....dossier qui contient les composants pour afficher les outils d'édition et de vision d'une image annotée
----index..........dossier qui contient les composants pour afficher la page d'index de l'application
----MainC.js.......Composant principal de l'app. Il appelle les autres composants
---constants.......dossier qui contient le fichier de contantes de l'app
---reducers........dossier qui contient les reducers de l'app (REDUX)
---storage.........dossier qui contient le stockage de données local de l'app
---store...........dossier qui contient le store de l'application (REDUX)
---app.js..........script principal de l'application
--styles...........dossier qui contient toutes les feuilles de style dde l'app
--index.html.......fichier html qui appelle l'app
-gulpfile..........gulpfile qui permet de configurer la commande gulp
-package.json......fichier package.json propre au projet npm webAnnotation
-readme.md.........readme en anglais
-readmeFR.md.......readme en français
```

### License

See license.txt

   [React]: <https://facebook.github.io/react/>
   [Redux]: <http://redux.js.org/>
   [Babel]: <https://babeljs.io/>
   [Browserify]: <http://browserify.org/>
   [Openlayers3]: <http://openlayers.org/>
   [jQuery]: <http://jquery.com>
   [Gulp]: <http://gulpjs.com>
