from flask import render_template,Flask,jsonify
import boto3
import datetime
app = Flask(__name__)


con = boto3.client('ec2',region_name='ap-south-1')

cw = boto3.client('cloudwatch',region_name='ap-south-1')


@app.route('/')
@app.route('/index')
def index():
    #EC2 details
    instances = con.describe_instances()
    instance_count = len(instances['Reservations'])
    stopped = 0
    running = 0
    for i in instances['Reservations']:
        if i['Instances'][0]['State']['Name'] == 'stopped':
            stopped = stopped + 1
        elif i['Instances'][0]['State']['Name'] == 'running':
            running = running + 1
    instance_count = len(instances['Reservations'])
    #S3 details
    s3 = boto3.resource('s3',region_name='ap-south-1')
    bucket_list = [bucket.name for bucket in s3.buckets.all()]
    s3_count=len(bucket_list)
    user = {'username': 'Miguel'}
    return render_template('index.html', title='Home', instance_count=str(instance_count),stopped=stopped,running=running,s3_count=s3_count)

@app.route('/get_instances')
def get_instances():
    con = boto3.client('ec2', region_name='ap-south-1')
    instances = con.describe_instances()
    instances = instances['Reservations']
    for i in instances:
        instance_id=i['Instances'][0]['InstanceId']
        cpu_usage = cw.get_metric_statistics(
            Period=300,
            StartTime=datetime.datetime.utcnow() - datetime.timedelta(days=0.054),
            EndTime=datetime.datetime.utcnow(),
            MetricName='CPUUtilization',
            Namespace='AWS/EC2',
            Statistics=['Average'],
            Dimensions=[{'Name': 'InstanceId', 'Value': instance_id}]
        )
        cpu_usage=cpu_usage['Datapoints'][0]['Average']
        i['Instances'][0]['CPU_data']=cpu_usage
        disk_read=cw.get_metric_statistics(
            Period=300,
            StartTime=datetime.datetime.utcnow() - datetime.timedelta(days=.125),
            EndTime=datetime.datetime.utcnow(),
            MetricName='DiskReadOps',
            Namespace='AWS/EC2',
            Statistics=['Average'],
            Dimensions=[{'Name':'InstanceId', 'Value':instance_id}]
        )
        i['Instances'][0]['DiskReads'] = disk_read['Datapoints'][0]['Average']
    return jsonify(instances)

if __name__ == '__main__':
  app.run(host='0.0.0.0',debug=True)
