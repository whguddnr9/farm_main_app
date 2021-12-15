import json
from flask import Flask, request, jsonify, render_template, make_response
import os
from view import send_json
# from module import parshingData

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)


@app.route('/')
def hello():
    return 'helloworld_state'

@app.route('/state')
def state():
    return render_template('state.html')

@app.route('/live-state')
def live_state():
    response = make_response(send_json.send_state_one1_1())

    response.content_type = 'application/json'

    return response

@app.route('/live-state2')
def live_state2():
    response = make_response(send_json.send_state_one1_2())

    response.content_type = 'application/json'

    return response


if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0')

