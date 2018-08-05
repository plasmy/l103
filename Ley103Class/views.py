from flask import Blueprint, jsonify, request, render_template, flash, session
from Ley103Class.model import Ley103Data
import datetime

l103Blueprint = Blueprint('l103', __name__)

'''Initial page. Shows the search form'''


@l103Blueprint.route('/', methods=['GET'])
def searchForm():
    payload = {
        'years': generateYears(2007)
    }

    return render_template('index.html', payload=payload)


'''API where the data is obtained. Receives year and month is an optional parameter'''


@l103Blueprint.route('/l103/<string:year>', defaults={'month': None}, methods=['GET'])
@l103Blueprint.route('/l103/<string:year>/<string:month>', methods=['GET'])
def search(year, month):
    l103Data = Ley103Data.ley103DataFactory(year, month)

    return jsonify(l103Data.getData())


'''Creates a list of years starting from the current year to 2007'''


def generateYears(lastYear):
    yearList = [i for i in range(datetime.datetime.now().year, lastYear - 1, -1)]
    return yearList
