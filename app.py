from flask import render_template, Flask, jsonify
import boto3
from datetime import datetime, timedelta
import pandas as pd

app = Flask(__name__)


@app.route('/tickets')
def ticket_details():
    file = 'static/opentickets_priority.xlsx'
    x = pd.read_excel(file)
    medium = x[x['Priority'].str.match('MEDIUM')]
    low = x[x['Priority'].str.match('LOW')]
    high = x[x['Priority'].str.match('High')]
    p1_time = timedelta(hours=4)
    p2_time = timedelta(hours=8)
    medium_tickets = {}
    low_tickets = {}
    high_tickets= {}
    try:
        for i in medium.index.values:
            medium_tickets[medium['Incident '][i]] = medium['Open time'][i]
    except Exception as e:
        medium_tickets['Status'] = 0

    try:
        for i in low.index.values:
            low_tickets[low['Incident '][i]] = low['Open time'][i]
    except Exception as e:
        low_tickets['Status'] = 0
    try:
        for i in high.index.values:
            high_tickets[high['Incident '][i]] = high['Open time'][i]
    except Exception as e:
        high_tickets['Status'] = 0

    response={'tickets':[medium_tickets,low_tickets,high_tickets]}
    return jsonify(response)

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', title='Home', num=60)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
