from flask import Blueprint, jsonify, request, render_template, flash, session
from Ley103Class.model import Ley103Data
import datetime

l103Blueprint = Blueprint('l103', __name__)


@l103Blueprint.route('/l103', methods=['GET'])
def searchForm():
    payload = {
        'years': generateYears(2007)
    }

    return render_template('index.html', payload=payload)


@l103Blueprint.route('/l103/<string:year>', defaults={'month': None}, methods=['GET'])
@l103Blueprint.route('/l103/<string:year>/<string:month>', methods=['GET'])
def search(year, month):
    print('In')
    l103Data = Ley103Data.ley103DataFactory(year, month)
    print('Found')

    '''Open files'''
    ftxt = open('./outputs/data.txt', 'w+')
    fcsv = open('./outputs/data.csv', 'w+')

    '''Write data to files'''
    ftxt.write(l103Data.fileString)
    fcsv.write(l103Data.fileString)

    return jsonify(l103Data.dataResult)


def generateYears(lastYear):
    yearList = [i for i in range(datetime.datetime.now().year, lastYear - 1, -1)]
    return yearList
