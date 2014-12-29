'use strict';
var fs = require('fs');
var path = require('path');
var util = require('util');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var wiredep = require('wiredep');
var chalk = require('chalk');

var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());
  this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
  this.scriptAppName = this.appname + angularUtils.appName(this);

  this.on('end', function () {
    var enabledComponents = [];

    if (this.animateModule) {
      enabledComponents.push('angular-animate/angular-animate.js');
    }
    if (this.ariaModule) {
      enabledComponents.push('angular-aria/angular-aria.js');
    }
    if (this.cookiesModule) {
      enabledComponents.push('angular-cookies/angular-cookies.js');
    }
    if (this.messagesModule) {
      enabledComponents.push('angular-messages/angular-messages.js');
    }
    if (this.resourceModule) {
      enabledComponents.push('angular-resource/angular-resource.js');
    }
    if (this.sanitizeModule) {
      enabledComponents.push('angular-sanitize/angular-sanitize.js');
    }
    if (this.touchModule) {
      enabledComponents.push('angular-touch/angular-touch.js');
    }
    enabledComponents = [
      'angular/angular.js',
      'angular-route/angular-route.js',
      'angular-mocks/angular-mocks.js'
    ].concat(enabledComponents).join(',');

    var jsExt = 'js';
  });

  this.pkg = require('../package.json');
  this.sourceRoot(path.join(__dirname, '../templates/common'));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function welcome() {
  this.log(yosay());
  this.log(
    chalk.magenta(
      'Out of the box I include Bootstrap and some AngularJS recommended modules.' +
      '\n'
    )
  );
};

Generator.prototype.askForModules = function askForModules() {
  var cb = this.async();
  var prompts = [{
    type: 'checkbox',
    name: 'modules',
    message: 'Which modules would you like to include?',
    choices: [
    {
      value: 'animateModule',
      name: 'angular-animate.js',
      checked: true
    }, {
      value: 'ariaModule',
      name: 'angular-aria.js',
      checked: false
    }, {
      value: 'cookiesModule',
      name: 'angular-cookies.js',
      checked: false
    }, {
      value: 'resourceModule',
      name: 'angular-resource.js',
      checked: false
    }, {
      value: 'messagesModule',
      name: 'angular-messages.js',
      checked: false
    }, {
      value: 'sanitizeModule',
      name: 'angular-sanitize.js',
      checked: true
    }, {
      value: 'touchModule',
      name: 'angular-touch.js',
      checked: false
    }
    ]
  }];

  this.prompt(prompts, function (props) {
    var hasMod = function (mod) { return props.modules.indexOf(mod) !== -1; };
    this.animateModule = hasMod('animateModule');
    this.ariaModule = hasMod('ariaModule');
    this.cookiesModule = hasMod('cookiesModule');
    this.messagesModule = hasMod('messagesModule');
    this.resourceModule = hasMod('resourceModule');
    this.sanitizeModule = hasMod('sanitizeModule');
    this.touchModule = hasMod('touchModule');

    var angMods = [];

    if (this.animateModule) {
      angMods.push("'ngAnimate'");
    }
    if (this.ariaModule) {
      angMods.push("'ngAria'");
    }
    if (this.cookiesModule) {
      angMods.push("'ngCookies'");
    }
    if (this.messagesModule) {
      angMods.push("'ngMessages'");
    }
    if (this.resourceModule) {
      angMods.push("'ngResource'");
    }
    if (this.sanitizeModule) {
      angMods.push("'ngSanitize'");
    }
    if (this.touchModule) {
      angMods.push("'ngTouch'");
    }
    if (angMods.length) {
      this.env.options.angularDeps = '\n    ' + angMods.join(',\n    ') + '\n  ';
    }

    cb();
  }.bind(this));
};

Generator.prototype.readIndex = function readIndex() {
  this.indexFile = this.engine(this.read('app/templates/index.html'), this);
};

Generator.prototype.packageFiles = function packageFiles() {
  this.template('root/_bower.json', 'bower.json');
  this.template('root/_bowerrc', '.bowerrc');
  this.template('root/_jshintrc', '.jshintrc');
  this.template('root/_package.json', 'package.json');
  this.template('root/_gulpfile.js', 'gulpfile.js');
  this.template('root/LICENSE', 'LICENSE');
  this.template('root/README.md', 'README.md');
  this.template('root/REQUIREMENTS.txt', 'REQUIREMENTS.txt');
};

Generator.prototype.packageFlaskFiles = function packageFiles() {
  this.template('app/__init__.py', '__init__.py');
  this.template('app/app.py', 'app.py');
  this.template('app/config.py', 'config.py');
  this.template('app/core/__init__.py', 'core/__init__.py');
  this.template('app/core/coffee_shops.py', 'core/coffee_shops.py');
  this.template('app/routes/__init__.py', 'routes/__init__.py');
  this.template('app/routes/api.py', 'routes/api.py');
  this.template('app/routes/home.py', 'routes/home.py');
};

Generator.prototype.packageJsFiles = function packageFiles() {
  this.template('app/static/js/app.js', 'static/js/app.js');
  this.template('app/static/js/components/api.js', 'static/js/components/api.js');
  this.template('app/static/js/components/pow.js', 'static/js/components/pow.js');
  this.template('app/static/js/pages/coffee-shops.js', 'static/js/pages/coffee-shops.js');
  this.template('app/static/js/pages/home.js', 'static/js/pages/home.js');
};

Generator.prototype.packageCssFiles = function packageFiles() {
  this.template('app/static/sass/style.scss', 'static/sass/style.scss');
  this.template('app/static/sass/modules/_colors.scss', 'static/sass/modules/_colors.scss');
  this.template('app/static/sass/pages/_home.scss', 'static/sass/pages/_home.scss');
  this.template('app/static/sass/partials/_footer.scss', 'static/sass/partials/_footer.scss');
  this.template('app/static/sass/partials/_header.scss', 'static/sass/partials/_header.scss');
};

Generator.prototype.packageTemplatesFiles = function packageFiles() {
  this.template('app/templates/index.html', 'templates/index.html');
  this.template('app/templates/components/pow.html', 'templates/components/pow.html');
  this.template('app/templates/pages/home.html', 'templates/pages/home.html');
};
