from flask import Flask, request
from Ley103Class.views import l103Blueprint
from Ley103Class.model import Ley103Data

app = Flask(__name__)
app.register_blueprint(l103Blueprint)


@app.route("/download", methods=['GET', 'POST'])
def download():
    values = request.form

    '''File type and name will depend on the format'''
    fileSettings = {
        'mime': 'text/plain',
        'name': 'data.txt'
    }
    if values['format'] == 'csv':
        fileSettings['mime'] = 'text/csv'
        fileSettings['name'] = 'data.csv'

    '''Get data from SOAP'''
    l103Data = Ley103Data.ley103DataFactory(values['year'], values['month'])

    '''Create the appropiate response to download the file.'''
    response = app.response_class(l103Data.fileString, mimetype=fileSettings['mime'])
    response.headers["Content-Disposition"] = "attachment; filename=" + fileSettings['name']
    return response
