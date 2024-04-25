var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itemSchema6 = new Schema(
  {
realtime:{
        type: mongoose.Schema.Types.Mixed,
    },

  },
  { collection: "info" }
);
module.exports = mongoose.model("Item6", itemSchema6);