var express = require("express");
var Item = require("../models/item7");

var itemRouter7 = express.Router();

itemRouter7.route("/items7").post(function (request, response) {
  const searchString = request.body.PartString;
  const regex = new RegExp("^" + searchString + "[a-z]*$", "i");
  Item.findOne({ PartString: { $regex: regex } }, (err, result) => {
    if (err) throw err;

    if (result) {
      let len = request.body.sequence.length;

      let len1 = searchString.length;

      let finallen = len1 - len;

      const searchString1 = result.PartString.slice(0, finallen);

      Item.find((err, Data) => {
        if (err) {
          response.status(500).send(err);
          return "sam";
        }

        let arr = [];

        for (let i = 0; i < Data.length; i++) {
          arr.push(Data[i].PartString);
        }
        let filterdata = arr.filter((str) => str.includes(searchString1));

        let SortedData = filterdata.sort();
        let seqarr = [];

        let len2 = -len;

        for (let i = 0; i < SortedData.length; i++) {
          let a = SortedData[i].slice(len2);
          seqarr.push(a);
        }

        const numbers = seqarr.map((num) => parseInt(num));

        let newString = "";
        let flag = true;
        if (seqarr.length === 1) {
          let nextno = parseInt(request.body.sequence);
          let nn = nextno + 1;
          let kd = nn.toString();
          newString = searchString.slice(0, len2) + kd;
        } else {
          for (let i = 0; i < numbers.length; i++) {
            let a = i + 1;
            if (numbers[i] !== numbers[a] - 1) {
              num = numbers[i] + 1;

              let nextseq = num.toString();

              newString = searchString.slice(0, len2) + nextseq;

              flag = false;
              break;
            }
          }
        }

        if (flag) {
          let nnn = numbers[numbers.length - 1] + 1;
          let eje = nnn.toString();
          newString = searchString.slice(0, len2) + eje;
        }

        var item = new Item({ PartString: newString });
        item.save();
        response.status(201).send(item);
      });
    } else {
      const firstString = searchString;
      var item = new Item({ PartString: firstString });
      item.save();
      response.status(201).send(item);
    }
  });
});

module.exports = itemRouter7;
