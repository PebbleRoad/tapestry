# Tapestry - Pattern Library Maker

An app for creating and managing your front-end pattern library.

1. Create patterns in Markdown files
2. Browseable interface
3. Free and open source

### Built with Gulp, Angular and Markdown/YAML

## How to use

1. Clone the repository

        git clone https://github.com/PebbleRoad/tapestry.git

2. Install NPM and bower packages
    
        npm install && bower install

3. Launch the server

        gulp patterns


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

1. Patterns folder is watched by Gulp and nodeJS `tree.js` script is used to generate JSON files for immediate `children` folders
2. AngularJS uses these JSON documents to show a browseable interface of the patterns