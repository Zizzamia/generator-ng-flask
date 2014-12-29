# -*- coding: utf-8 -*-
"""
routes.home.py
~~~~~~

:copyright: (c) 2014
"""
from flask import (Blueprint, current_app, render_template,
                   request, send_from_directory)

home = Blueprint('home', __name__)

@home.route('/')
@home.route('/coffee-shops')
def index():
  """Redirect to the AngularJS entry."""
  return render_template('index.html')


@home.route('/<path:path>')
def file_path(path):
  """Serves template resources."""
  return render_template(path)
  

@home.route('/robots.txt/')
@home.route('/sitemap.xml/')
@home.route('/favicon.ico/')
def static_from_root():
  """Serves static resources."""
  return send_from_directory(current_app.static_folder, request.path[1:])


@home.route('/<path:filename>')
def templates(filename):
  """Serves template resources."""
  return render_template(filename)
