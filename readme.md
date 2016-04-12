# Web Annotation

Web Annotation abbreviated WA is a library / tool that allows to annotate images.

Annotate an image is to create one or more annotations on the image.
An annotation consists of a marking (set of points that created a shape like a circle, a square, rectangle, polygon, ...) and a textual description associated with this marking.

WA is divided into three parts:
* The home page can load a normal or annotated image.
* The WA editor tool allows to annotate an image.
* the WA view tool allows viewing annotations of an image.

### Authors
* Mathieu Guyot (lead dev) -> mathieuguyot40@yahoo.fr
* Loïc Favrelière (dev) -> loic79.favreliere@gmail.com
* Cyrille Suire (initiator of WA project) -> cyrille.suire@univ-lr.fr
* Axel Jean-Caurant (initiator of WA project) -> axel.jean-caurant@univ-lr.fr

### Version
1.0.0

### Technologies

WA uses the following technologies

* [React] React nous permet de créer les composants graphiques de l'app.
* [Openlayers3] Openlayers est utilisé pour manipuler les images.
* [Redux] l'app WA utilise l'architecture redux
* [Babel] L'app WA est écrite en ES6, donc nous avons besoin de Babel
* [Browserify] L'app WA est écrite en ES6, donc nous avons besoin de Browserify
* [Gulp] On build l'app WA avec Gulp
* [JQuery] Certaines fonctions de JQuery sont utilisées dans l'app.
* [ React ] React allows us to create graphical components of the app.
* [ Openlayers3 ] Openlayers is used to manipulate images.
* [ Redux ] WA app uses the architecture redux
* [ Babel ] WA app is written in SS6 , so we need to Babel
* [ Browserify ] WA app is written in SS6 , so we need Browserify
* [ Gulp ] WA app is build with Gulp
* [ JQuery ] Some features of jQuery are used in the app.

### Installation

You have to install gulp globally to build the project.
```sh
$ npm i -g gulp
```

```sh
$ sudo npm i
```

Note that installing openlayers via npm is quite capricious ...
Be careful to check your version of npm, empty the cache and run npm in administrator.

### Development

Want to help us develop webAnnotation ? Great !
Web Annotation use gulp for rapid development.
Start gulp command to build the project (if the command is active, any changes to a script automatically rebuild the project).

```sh
$ sudo gulp
```

### File tree

Here is how to organize the WA project

```sh
webAnnotation
-app...............root folder of the app
--font.............fonts of the app
--images...........images of the app
--jsExternal.......scripts extenal of the app
--scripts..........folder that contains scripts of the app
---actions.........folder that contains all the actions of the app (REDUX architecture)
---components......folder that contains all the components of the app (REACT architecture)
----imgAnLib.......folder that contains the lib component of the app
----imgAnTools.....folder that contains components to display the edit and view tools to manipulate annoted image
----index..........folder that contains all the components to display the index view
----MainC.js.......Main component of the app. This component call each others
---constants.......folder that contains constants
---reducers........folder that contains all the reducers of the app (REDUX architecture)
---storage.........folder that contains local storage of the app
---store...........folder that contains the store of the app (REDUX architecture)
---app.js..........Main script of the app
--styles...........stylesheets of the app
--index.html.......html file which call the app
-gulpfile..........gulpfile of the WA project
-package.json......package.json file of the WA project
-readme.md.........readme in english
-readmeFR.md.......readme in french
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
