var path = require('path');
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var sqs = new AWS.SQS();
// Load credentials and set the region from the JSON file
AWS.config.loadFromPath('./config.json');

var allQueues = require(path.join(__dirname,"commands",'list_queues.js'));
var queueUrl = require(path.join(__dirname,"commands", "get_queue_url.js"));
var createQueue = require(path.join(__dirname,"commands", "create_queue.js"));
var sqs;

newQueue = createQueue(null,'Queue1-SOMETIMESTAMP',null,function(err,data){
    if (err) throw err;
    console.log(data);
});

getQueueUrl = queueUrl(null,"Queue1-SOMETIMESTAMP",function(err,data){
    if (err) throw err;
    console.log(data);
});

function queueExists(qName) {
    queueUrl(null,qName,function(err,data) {
        if (err) throw err;
    })
}

function sendMessage(messabody,queueurl,type) {
    var params = {
        MessageBody: 'STRING_VALUE', /* required */
        QueueUrl: 'STRING_VALUE', /* required */
        DelaySeconds: 0,
        MessageAttributes: {
            someKey: {
                DataType: 'STRING_VALUE', /* required */
                BinaryListValues: [
                    new Buffer('...') || 'STRING_VALUE',
                    /* more items */
                ],
                BinaryValue: new Buffer('...') || 'STRING_VALUE',
                StringListValues: [
                    'STRING_VALUE',
                    /* more items */
                ],
                StringValue: 'STRING_VALUE'
            },
            /* anotherKey: ... */
        },
        MessageDeduplicationId: 'STRING_VALUE',
        MessageGroupId: 'STRING_VALUE'
    };
    sqs.sendMessage(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
}

function listen(lobbyName){
    /* This example receives up to 10 available messages, returning all available attributes. */

    var params = {
        AttributeNames: [
            "All"
        ],
        MaxNumberOfMessages: 10,
        MessageAttributeNames: [
            "All"
        ],
        QueueUrl: lobbyName,
        VisibilityTimeout: 123,
        WaitTimeSeconds: 123
    };
    sqs.receiveMessage(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
        /*
         data = {
         Messages: [
         {
         Attributes: {
         "ApproximateFirstReceiveTimestamp": "1442428276921",
         "ApproximateReceiveCount": "5",
         "SenderId": "AIDAIAZKMSNQ7TEXAMPLE",
         "SentTimestamp": "1442428276921"
         },
         Body: "My first message.",
         MD5OfBody: "1000f835...a35411fa",
         MD5OfMessageAttributes: "9424c491...26bc3ae7",
         MessageAttributes: {
         "City": {
         DataType: "String",
         StringValue: "Any City"
         },
         "PostalCode": {
         DataType: "String",
         StringValue: "ABC123"
         }
         },
         MessageId: "d6790f8d-d575-4f01-bc51-40122EXAMPLE",
         ReceiptHandle: "AQEBzbVv...fqNzFw=="
         }
         ]
         }
         */
    });
}


module.exports = {
    listQueues: function(callback) {
        listAllQueues(error,function(err,data){
            callback(data);
        })
    },

    listen: function(qName) {
        listen(qName);
    }
};

