# -*- coding: utf-8 -*-
"""
app.py
~~~~~~

:copyright: (c) 2014
"""
import sys
from flask import Flask
from flask.ext.script import Manager

import config
from routes.api import api
from routes.home import home

LIST_MODULES = [api,
                home] 

app = Flask('app')

def initialize_app(app=app, config_cls='Default'):
  """
  Compose the dependencies and initialize the Flask app.

  :param app:Existing flask object
  :param config_cls:Flask config class
  :return:
  """
  try:
    config_cls = getattr(config, config_cls)
    app.config.from_object(config_cls)
  except AttributeError:
    traceback = sys.exc_traceback
    raise (AttributeError, "Config class '%s' does not exist in app.config module" % config_cls,
           traceback)
  for module in LIST_MODULES:
    app.register_blueprint(module)

manager = Manager(app)

@manager.command
def run(address='0.0.0.0', port='5000', config='Default'):
  """Run development server"""
  initialize_app(app, config_cls=config)
  app.run(host=address, port=int(port))

if __name__ == '__main__':
  manager.run()
