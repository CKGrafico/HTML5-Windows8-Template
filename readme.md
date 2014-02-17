**This template is created to automatize the tasks**
- Automatic include js and css in default.html
- Batch files to run the commands.
    - _initialize.bat to initialize the project
    - _build.bat pass from development to production
    - _watch.bat run watcher
- Automatic compilation Handlebars templates and put it in namespace Handlebars.templates
-  Automatic compilation of SASS files into css

**Included**
- Gulp
- Handlebars
- jQuery
- bower.json to include your dependencies

**Dependencies**
- Nodejs
- Bower
- SASS

**Instructions**
- Edit bower.json
    *And write your dependencies (jquery, handlebars, etc..)*

- Run _initialize.bat or command 'node install' + 'bower install' + 'gulp initialize'
    *This install all gulp dependencies*

- Run _watch.bat or command 'gulp watch'
    *This init gulp watcher*

- To build run _build.bat or command 'gulp build'
    *This change development mode to production*

**TODO**
- Improve gulp tasks
- Improve bower dependencies (and remove sizzle when include jQuery :S)