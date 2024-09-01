const express = require("express");
const Router  = express.Router();

const { signin, signup } = require("../controllers/loginControls");
const Meals = require("../controllers/mealControls");
const Wallet = require("../controllers/walletControls");
const Categories = require("../controllers/categoryControls");

Router.post("/signup", signup)
    .get("/signin", signin)
    .get("/meals", Meals.meals)
    .get("/categories", Categories.categories)
    .get("/wallet", Wallet.walletAmount)
    
    

module.exports = Router;