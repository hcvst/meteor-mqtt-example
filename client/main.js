import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

PseudoMessagesCollection = new Meteor.Collection("messages");
Meteor.subscribe("messages");

Template.msgs.helpers({
  messages(){
    return PseudoMessagesCollection.find({});
  }
});

//Template.hello.events({
//  'click button'(event, instance) {
//    // increment the counter when button is clicked
//    instance.counter.set(instance.counter.get() + 1);
//  },
//});
//
//Template.hello.onCreated(function helloOnCreated() {
//  // counter starts at 0
//  this.counter = new ReactiveVar(0);
//});
//
//Template.hello.helpers({
//  counter() {
//    return Template.instance().counter.get();
//  }
//});
