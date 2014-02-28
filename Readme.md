# Tapestry - Pattern Library Maker

An app for creating and managing your front-end pattern library.

1. Create patterns in Markdown files
2. Browseable interface
3. Free and open source

### Built with Gulp, Angular and Markdown/YAML

## How to use

Dependecy

* [NodeJS](http://nodejs.org/)
* Bower
        
        npm install -g bower

1. Clone the repository

        git clone https://github.com/PebbleRoad/tapestry.git

2. Install NPM and bower packages
    
        npm install && bower install

3. Launch the server

        gulp patterns
4. Open your browser and navigate to
        
        http://localhost:8000


## Pattern format

    ---
    name: Alert
    description: |
        ### What
        Page­ level information or service alert. Critical updates with a defined time period should be pushed using the alert box.
        ### Use when
        For page­level critical updates.
    ---
    <div class="ui-alert ui-alert--success">
        <div class="alert__title">This is a success alert</div>
        <div class="alert__body">More body text</div>
        <a href="#" class="alert_close"></a>
    </div>

## How it works

1. Patterns folder is watched by Gulp and JSON files are generated for each root pattern
2. AngularJS uses these JSON documents to show a browseable interface of the patterns
3. Inject your own CSS by editing `index.html` and add your own patterns

## Todo

1. Unit testing gulp plugins - gulp-tree and gulp-script-inject
2. Unit testing of the Angular app