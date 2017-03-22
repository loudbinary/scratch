// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set the region from the JSON file
AWS.config.loadFromPath('./config.json');

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

module.exports = function get_queue_url(error,queueName,callback) {
    var params = {
        QueueName: queueName
    };
    sqs.getQueueUrl(params, function(err, data) {
        if (err) {
            return callback(err)
        } else {
            return callback(null,data.QueueUrl);
        }
    });
}