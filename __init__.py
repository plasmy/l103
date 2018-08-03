from flask import Flask, send_file
from Ley103Class.views import l103Blueprint
import os

app = Flask(__name__)
app.register_blueprint(l103Blueprint)


@app.route("/download/<string:fileType>")
def download(fileType):
    fileName = './outputs/data.' + fileType
    try:
        return send_file(fileName, as_attachment=True)
    except Exception as e:
        raise(e)
        return "ERROR"
