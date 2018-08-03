from flask import Blueprint, jsonify, request, render_template, flash, session
from Ley103Class.model import Ley103Data
import datetime

l103Blueprint = Blueprint('l103', __name__)


@l103Blueprint.route('/l103', methods=['GET'])
def inventory():
    #l103Data = Ley103Data.ley103DataFactory('2007', '01')

    payload = {
        'years': generateYears(2007)
        #'data': l103Data.dataResult
    }

    return render_template('index.html', payload=payload)


@l103Blueprint.route('/l103/<string:year>', defaults={'month': None}, methods=['GET'])
@l103Blueprint.route('/l103/<string:year>/<string:month>', methods=['GET'])
def inventory(year, month):
    l103Data = Ley103Data.ley103DataFactory(year, month)

    return jsonify(l103Data.dataResult)


def generateYears(lastYear):
    yearList = [i for i in range(datetime.datetime.now().year, lastYear - 1, -1)]
    return yearList
