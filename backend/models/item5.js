var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itemSchema5 = new Schema(
  {
  sam:{
        type: mongoose.Schema.Types.Mixed,
    },
  },
  { collection: "FormData" }
);

module.exports = mongoose.model("Item5", itemSchema5);