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

  this.option('app-suffix', {
    desc: 'Allow a custom suffix to be added to the module name',
    type: String,
    required: 'false'
  });
  this.env.options['app-suffix'] = this.options['app-suffix'];
  this.scriptAppName = this.appname + angularUtils.appName(this);

  args = ['main'];

  if (typeof this.env.options.appPath === 'undefined') {
    this.option('appPath', {
      desc: 'Allow to choose where to write the files'
    });

    this.env.options.appPath = this.options.appPath;

    if (!this.env.options.appPath) {
      try {
        this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
      } catch (e) {}
    }
    this.env.options.appPath = this.env.options.appPath || 'app';
    this.options.appPath = this.env.options.appPath;
  }

  this.appPath = this.env.options.appPath;

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

    this.installDependencies({
      skipInstall: this.options['skip-install'],
      skipMessage: this.options['skip-message'],
      callback: this._injectDependencies.bind(this)
    });
  });

  this.pkg = require('../package.json');
  this.sourceRoot(path.join(__dirname, '../templates/common'));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function welcome() {
  if (!this.options['skip-welcome-message']) {
    this.log(yosay());
    this.log(
      chalk.magenta(
        'Out of the box I include Bootstrap and some AngularJS recommended modules.' +
        '\n'
      )
    );
  }

  if (this.options.minsafe) {
    this.log.error(
      'The --minsafe flag has been removed. For more information, see' +
      '\nhttps://github.com/yeoman/generator-angular#minification-safe.' +
      '\n'
    );
  }
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

Generator.prototype.appJs = function appJs() {
  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'js',
    optimizedPath: 'scripts/scripts.js',
    sourceFileList: ['scripts/app.js', 'scripts/controllers/main.js'],
    searchPath: ['.tmp', this.appPath]
  });
};

Generator.prototype.createIndexHtml = function createIndexHtml() {
  this.indexFile = this.indexFile.replace(/&apos;/g, "'");
  this.write(path.join(this.appPath, 'index.html'), this.indexFile);
};

Generator.prototype.packageFiles = function packageFiles() {
  this.template('root/_bower.json', 'bower.json');
  this.template('root/_bowerrc', '.bowerrc');
  this.template('root/_package.json', 'package.json');
  this.template('root/_gulpfile.js', 'gulpfile.js');
};

Generator.prototype._injectDependencies = function _injectDependencies() {
  if (this.options['skip-install']) {
    this.log(
      'After running `npm install & bower install`, inject your front end dependencies' +
      '\ninto your source code by running:' +
      '\n' +
      '\n' + chalk.yellow.bold('grunt wiredep')
    );
  } else {
    wiredep({
      directory: 'bower_components',
      bowerJson: JSON.parse(fs.readFileSync('./bower.json')),
      ignorePath: new RegExp('^(' + this.appPath + '|..)/'),
      src: 'app/index.html',
      fileTypes: {
        html: {
          replace: {
            css: '<link rel="stylesheet" href="{{filePath}}">'
          }
        }
      }
    });
  }
};