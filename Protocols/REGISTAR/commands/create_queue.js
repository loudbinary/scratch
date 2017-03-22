// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set the region from the JSON file
AWS.config.loadFromPath('./config.json');


// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var Attributes = {'DelaySeconds': '60','MessageRetentionPeriod': '86400'};

module.exports = function create_queue(error, queueName, attributes,callback) {
    if (!attributes) attributes = Attributes;
    var params = {
        QueueName: queueName,
        Attributes: attributes
    };
    sqs.createQueue(params,function(err,data){
        if (err) callback(err);
        return callback(null,data.QueueUrl);
    })
};