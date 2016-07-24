import { Meteor } from 'meteor/meteor';

var mqttClient;

Meteor.startup(() => {
    mqttClient = mqtt.connect("mqtt://test.mosquitto.org");
    mqttClient.subscribe("pysense");
});

Meteor.publish("messages", function(){
    var self = this;
    mqttClient.on("message", function(topic, message){
        var timestamp = new Date();
        var record = {
            topic: topic,
            message: message.toString(),
            timestamp: timestamp
        };
        console.log(record);
        self.added("messages", timestamp.toString(), record);
    });
    self.ready()
    //ready = true;
});