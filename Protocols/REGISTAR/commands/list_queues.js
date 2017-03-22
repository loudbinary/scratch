// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set the region from the JSON file
AWS.config.loadFromPath('./config.json');

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {};


// List all queues in Amazon Account
module.exports = function list_queues(error, callback){
    sqs.listQueues(params, function(err, data) {
        if (err) {
            if (callback) callback(error);
            console.log("Error", err);
        } else {
            return callback (null,data.QueueUrls);
        }
    });
}