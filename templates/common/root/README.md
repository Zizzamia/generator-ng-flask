<%= _.slugify(_.humanize(appname)) %>
========================

## Quick start
Just for running a new app let's follow these 5 steps.
```shell
# Create your own environment from the new_app folder
virtualenv venv && . venv/bin/activate

# Install libraries
pip install -r REQUIREMENTS.txt

# Build bower js components files
gulp build-bower-components

# Build js and css files
gulp build

# Run app 
python app.py run
```

## Development
For running the dev enviroment you just need install
all the dependencies by `npm`, the [node package manager][npm-site]. 

```
npm install -g bower
npm install
bower install
```

Run dev enviroment, it's a watch script with several task running
like jshint, html2js, build and unit test on the js build files.
```
gulp build
gulp watch
```

[npm-site]: https://www.npmjs.org/
