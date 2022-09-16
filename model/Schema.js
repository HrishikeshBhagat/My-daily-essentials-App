const mongoose = require("mongoose");
const schema = mongoose.Schema({
  groceryItem: {
    required: true,
    type: String,
  },
  isPurchased: {
    required: true,
    type: Boolean,
  },
});

module.exports = mongoose.model("list", schema);
