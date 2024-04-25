var express = require("express");
var Item = require("../models/item5");

var itemRouter5 = express.Router();

itemRouter5
  .route("/items5")
  .post(function (request, response) {
    var item = new Item(request.body);

    item.save();

    response.status(201).send(item);
  })
  .get(function (request, response) {
    Item.find(function (error, items5) {
      if (error) {
        response.status(500).send(error);
        return;
      }

      for (let i = 0; i < items5.length; i++) {
        let arr1 = [];
        const objectIndex = items5[i].sam.findIndex(
          (item) => typeof item === "object"
        );

        for (const key in items5[i].sam[objectIndex]) {
          arr1.push(key);
        }

        items5[i].sam[objectIndex].seq = arr1;
      }
      response.json(items5);
    });
  });

module.exports = itemRouter5;
