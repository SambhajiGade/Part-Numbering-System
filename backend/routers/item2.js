var express = require("express");
var Item = require("../models/item2");

var itemRouter = express.Router();

itemRouter
  .route("/items2")
  .post(function (request, response) {
    var item = new Item({
      UserData: request.body.UserData,
      Textlength: request.body.Textlength,
    });

    item.save();

    response.status(201).send(item);
  })
  .get(function (request, response) {
    Item.find(function (error, items) {
      if (error) {
        response.status(500).send(error);
        return;
      }

      response.json(items);
    });
  });

itemRouter
  .route("/items2/:itemId")
  .get(function (request, response) {
    var itemId = request.params.itemId;

    Item.findOne({ id: itemId }, function (error, item) {
      if (error) {
        response.status(500).send(error);
        return;
      }

      response.json(item);
    });
  })
  .put(function (request, response) {
    var itemId = request.params.itemId;

    Item.findOne({ id: itemId }, function (error, item) {
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {
        item.name = request.body.name;
        item.description = request.body.description;
        item.quantity = request.body.quantity;

        item.save();

        response.json(item);
        return;
      }

      response.status(404).json({
        message: "Item with id " + itemId + " was not found.",
      });
    });
  })
  .patch(function (request, response) {
    var itemId = request.params.itemId;

    Item.findOne({ id: itemId }, function (error, item) {
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {
        for (var property in request.body) {
          if (request.body.hasOwnProperty(property)) {
            if (typeof item[property] !== "undefined") {
              item[property] = request.body[property];
            }
          }
        }

        item.save();

        response.json(item);
        return;
      }

      response.status(404).json({
        message: "Item with id " + itemId + " was not found.",
      });
    });
  })
  .delete(function (request, response) {
    var itemId = request.params.itemId;

    Item.findOne({ id: itemId }, function (error, item) {
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {
        item.remove(function (error) {
          if (error) {
            response.status(500).send(error);
            return;
          }

          response.status(200).json({
            message: "Item with id " + itemId + " was removed.",
          });
        });
      } else {
        response.status(404).json({
          message: "Item with id " + itemId + " was not found.",
        });
      }
    });
  });

module.exports = itemRouter;
