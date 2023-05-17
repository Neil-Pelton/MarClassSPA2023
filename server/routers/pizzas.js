const { Router } = require("express");//grabs router from express framework using deconstruction process --> {Router} pulls router object out of express (expressjs.com for reference)
const Pizza = require("../models/Pizza");//imports Pizza model into router
const router = Router();//instantiate router and store in Router()
// Create record in MongoDB Atlas using Mongoose.js ORM
router.post("/", (request, response) => {
  const newPizza = new Pizza(request.body);//takes request body and makes a new Pizza model
  newPizza.save((error, record) => {//save that in a new pizza variable, tell mongoose to do a save in that pizza document
    // if (error && error.name && error.name === "ValidationError")
    if (error?.name === "ValidationError")
      return response.status(400).json(error.errors);
    if (error) return response.status(500).json(error.errors);
    response.json(record);
  });
});
// Get (read) all records from the collection
router.get("/", (request, response) => {
  Pizza.find({}, (error, record) => {
    if (error) return response.status(500).json(error.errors);
    response.json(record);
  });
});
// Get a single record by ID using a query parameter
router.get("/:id", (request, response) => {
  Pizza.findById(request.params.id, (error, record) => {
    if (error) return response.status(500).json(error.errors);
    response.json(record);
  });
});
router.delete("/:id", (request, response) => {
  Pizza.findByIdAndRemove(request.params.id, {}, (error, record) => {
    if (error) return response.status(500).json(error.errors);
    response.json(record);
  });
});
// setting an update 9.1
router.put("/:id", (request, response) => {
  const body = request.body;
  Pizza.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        // Take note that the customer is not included, so it can't update the customer
        crust: body.crust,
        cheese: body.cheese,
        sauce: body.sauce,
        toppings: body.toppings
      }
    },
    {
      //options
      new: true,
      upsert: true
    },
    //response handler
    (error, record) => {
      if (error?.name === "ValidationError")
        return response.status(400).json(error.errors);
      if (error) return response.status(500).json(error.errors);
      response.json(record);
    }
  );
});
module.exports = router;
