var path = require('path');
var registrar = require('registrar');
//registrar.login;


      registrar.listQueues(function(err,data){
    var params = {
        DelaySeconds: 10,
        MessageAttributes: {
            "City": {
                DataType: "String",
                StringValue: "Any City"
            },
            "Greeting": {
                BinaryValue: "somethings here",
                DataType: "Binary"
            },
            "Population": {
                DataType: "Number",
                StringValue: "1250800"

            },
            MessageBody: "Information about the largest city in Any Region.",
            QueueUrl: registrar.listQueues[0]
        }
    };

        sqs.sendMessage(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
        /*
         data = {
         MD5OfMessageAttributes: "00484c68...59e48f06",
         MD5OfMessageBody: "51b0a325...39163aa0",
         MessageId: "da68f62c-0c07-4bee-bf5f-7e856EXAMPLE"
         }
         */
    });
});



