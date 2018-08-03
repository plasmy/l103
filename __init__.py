from flask import Flask
from Ley103Class.views import l103Blueprint

app = Flask(__name__)
app.register_blueprint(l103Blueprint)
