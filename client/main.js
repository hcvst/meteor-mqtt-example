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

Template.barChart.onRendered(function(){
  console.log("Barchart onRendered");
  var svg = d3.select("#chart")
      .append("svg")
      .attr("width", 640)
      .attr("height", 200);

  Deps.autorun(function(){

    var dataset = PseudoMessagesCollection.find({}).fetch();

    var bars = svg.selectAll(".bar")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", function(d, i) {return "bar"})
        .attr("x", function(d, i) {return 30*i;})
        .attr("y", 0)
        .attr("width", 28)
        .attr("height", function(d, i) {return d.message;});

    //
    //
    ////select elements that correspond to documents
    //var bars = svg.selectAll("rect")
    //    .data(dataset, key); //bind dataset to objects using key function
    //
    ////handle new documents via enter()
    //bars.enter()
    //    .append("rect")
    //...
    //
    ////handle updates to documents via transition()
    //bars.transition()
    //...
    //
    ////handle removed documents via exit()
    //bars.exit()
    //...
    //.remove();
  });
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
