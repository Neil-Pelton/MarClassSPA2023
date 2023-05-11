const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({ //schema defines what a valid document should look like
  customer: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/ //standardizes input values
  },
  crust: {
    type: String,
    required: true,
    enum: ["thin", "chicago", "deep-dish", "hella-thick"]
  },
  cheese: {
    type: String,
    validate: /^[A-Za-z0-9 ]*$/
  },
  sauce: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  },
  toppings: [String] //array of strings
});

const Pizza = mongoose.model("Pizza", pizzaSchema); //turns schema into a model named Pizza. pizzaSchema passed into second argument of model method. Empowers schema to manipulate database.

module.exports = Pizza; //exports Pizza out --> becomes JS module that can be called in another file using a require
