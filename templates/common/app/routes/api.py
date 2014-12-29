# -*- coding: utf-8 -*-
"""
routes.api.py
~~~~~~

:copyright: (c) 2014
"""
from flask import Blueprint, jsonify

import core.coffee_shops

api = Blueprint('api', __name__)

@api.route('/api/coffee-shop/list.json')
def coffee_shop_list():
  """ Get list cooffee shops """
  data = core.coffee_shops.get_list()
  return jsonify(data)
