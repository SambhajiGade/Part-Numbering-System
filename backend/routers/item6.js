var express = require("express");
var Item = require("../models/item6");

var itemRouter6 = express.Router();

itemRouter6
  .route("/items6")
  .post(function (request, response) {
    var item = new Item({ realtime: request.body });

    item.save();
    response.status(201).send(item);
  })
  .get(function (request, response) {
    Item.find(function (error, items6) {
      if (error) {
        response.status(500).send(error);
        return;
      }
      response.json(items6);
    });
  });

itemRouter6.route("/items6/:itemId").get(function (request, response) {
  var itemId = request.params.itemId;

  Item.findOne({ id: itemId }, function (error, item) {
    if (error) {
      response.status(500).send(error);
      return;
    }

    response.json(item);
  });
});

module.exports = itemRouter6;
