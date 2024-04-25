var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itemSchema7 = new Schema(
  {
PartString:{
        type: mongoose.Schema.Types.Mixed,
    },

  },
  { collection: "Final" }
);

module.exports = mongoose.model("Item7", itemSchema7);