const {Router} = require("express"); //grabs router from express framework using deconstruction process --> {Router} pulls router object out of express (expressjs.com for reference)
const Pizza = require("../models/Pizza"); //imports Pizza model into router
const router = Router(); //instantiate router and store in Router()



// Route definitions go here

// Create record in MongoDB Atlas using Mongoose.js ORM
router.post("/", (request, response) => { //ASK ABOUT "/" PATH AND WHY
  const newPizza = new Pizza(request.body); //takes request body and makes a new Pizza model
  newPizza.save((error, record) => { //save that in a new pizza variable, tell mongoose to do a save in that pizza document
    if (error.name && error.name === 'ValidationError') return response.status(400).json(error.errors);
    if (error) return response.status(500).json(error.errors);

    response.json(record);
  });
});


module.exports = router; //export router as module, allows us to extract from app.js file so all routes aren't in a single file
