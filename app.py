from flask import render_template, Flask, jsonify, request, redirect, flash, url_for
from datetime import datetime, timedelta
import pandas as pd
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
secret_key = 'heheheehehehe'
file = 'static/Pfizer_tickets.xlsx'
ufile = 'Pfizer_tickets.xlsx'
app.config['UPLOAD_FOLDER'] = '/home/vicz/Desktop/aws-admin/CDP-Lite/static/'
app.config['SECRET_KEY'] = secret_key
ALLOWED_EXTENSIONS = ['xlsx']


def convert_timedelta(t):
    days, seconds, microseconds = t.days, t.seconds, t.microseconds
    tot_seconds = (microseconds/1000000) + seconds
    tot_minutes = tot_seconds/60 + days*1440
    return tot_minutes


def get_daywise_count(x):
    p1lst = []
    p2lst = []
    p3lst = []
    p4lst = []
    day_list = []
    for i in x['Open Time']:
        day_list.append(i.day)
    day_list = list(set(day_list))
    for j in day_list:
        p1, p2, p3, p4 = 0, 0, 0, 0
        for i in x.index.values:
            if x['Open Time'][i].day == j:
                if x['Priority'][i] == 'CRITICAL':
                    p1 = p1 + 1
                elif x['Priority'][i] == 'HIGH':
                    p2 = p2 + 1
                elif x['Priority'][i] == 'MEDIUM':
                    p3 = p3 + 1
                elif x['Priority'][i] == 'LOW':
                    p4 = p4 + 1
        p1lst.append(p1)
        p2lst.append(p2)
        p3lst.append(p3)
        p4lst.append(p4)
    return {'Days': day_list, 'P1': p1lst, 'P2': p2lst, 'P3': p3lst, 'P4': p4lst}


def category_count(x):
    snmp = 0
    s3 = 0
    roles = 0
    policies = 0
    keys = 0
    backup = 0
    sg = 0
    category = {}
    for i in x.index.values:
        if 'SNMP' in x['Brief Description'][i]:
            snmp = snmp + 1
        elif 's3' in x['Brief Description'][i].lower():
            s3 = s3 + 1
        elif 'BACKUP' in x['Brief Description'][i]:
            backup = backup + 1
        elif 'role' in x['Brief Description'][i].lower():
            roles = roles + 1
        elif 'polic' in x['Brief Description'][i].lower():
            policies = policies + 1
        elif 'key' in x['Brief Description'][i].lower():
            keys = keys + 1
        elif 'security group' in x['Brief Description'][i].lower():
            sg = sg + 1
    category['count'] = [snmp, s3, roles, policies, keys, backup, sg]
    category['label'] = ['SNMP', 'S3', 'Role', 'Policies', 'Keys', 'Backup', 'SG']
    return category


@app.route('/tickets')
def ticket_details():
    x = pd.read_excel(file)
    x['Open Time'] = pd.to_datetime(x['Open Time'])
    medium = x[x['Priority'].str.match('MEDIUM')]
    low = x[x['Priority'].str.match('LOW')]
    high = x[x['Priority'].str.match('HIGH')]
    critical = x[x['Priority'].str.match('CRITICAL')]
    now=datetime.now()
    p1_time = timedelta(hours=3)
    p2_time = timedelta(hours=8)
    p3_time = timedelta(days=3)
    p4_time = timedelta(days=4)
    medium_tickets = {}
    low_tickets = {}
    high_tickets = {}
    critical_tickets = {}

    try:
        for i in critical.index.values:
            if now-critical['Open Time'][i] > p1_time:
                time_left='Breached'
            else:
                time_left = p1_time - (now - critical['Open Time'][i])
                time_left = convert_timedelta(time_left)
            critical_tickets[critical['Incident '][i]] = {'Open Time':critical['Open Time'][i], 'Time left':str(time_left)}

    except Exception as e:
        medium_tickets['Status'] = 0
    try:
        for i in medium.index.values:
            if now-medium['Open Time'][i] > p3_time:
                time_left='Breached'
            else:
                time_left = p1_time - (now - medium['Open Time'][i])
                time_left = convert_timedelta(time_left)
            medium_tickets[medium['Incident '][i]] = {'Open Time':medium['Open Time'][i], 'Time left': str(time_left)}

    except Exception as e:
        medium_tickets['Status'] = 0

    try:
        for i in low.index.values:
            if now-low['Open Time'][i] > p4_time:
                time_left = 'Breached'
            else:
                time_left = p4_time - (now - low['Open Time'][i])
                time_left = convert_timedelta(time_left)
            low_tickets[low['Incident '][i]] = {'Open Time':low['Open Time'][i], 'Time left': str(time_left)}

    except Exception as e:
        low_tickets['Status'] = 0
    try:
        for i in high.index.values:
            if now-high['Open Time'][i] > p2_time:
                time_left = 'Breached'
            else:
                time_left = p2_time - (now - high['Open Time'][i])
                time_left = convert_timedelta(time_left)
            high_tickets[high['Incident '][i]] = {'Open Time':high['Open Time'][i], 'Time left': str(time_left)}

    except Exception as e:
        high_tickets['Status'] = 0
    response = {'tickets': [critical_tickets, high_tickets, medium_tickets, low_tickets], 'ticket_count': get_daywise_count(x), 'category': category_count(x)}
    return jsonify(response)


@app.route('/')
@app.route('/index')
def index():
    x = pd.read_excel(file)
    medium = x[x['Priority'].str.match('MEDIUM')]
    low = x[x['Priority'].str.match('LOW')]
    high = x[x['Priority'].str.match('HIGH')]
    critical = x[x['Priority'].str.match('CRITICAL')]
    p1 = len(critical)
    p2 = len(high)
    p3 = len(medium)
    p4 = len(low)
    print([p1,p2,p3,p4])
    return render_template('index.html', title='Home', p1_count=p1, p2_count=p2, p3_count=p3, p4_count=p4)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods = ['POST', 'GET'])
@app.route('/uploads', methods = ['POST', 'GET'])
def upload():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], ufile))
            return redirect(url_for('index'))
    return render_template('upload.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
