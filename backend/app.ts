import express from "express";
import mongoose from "mongoose";
import router from "./controllers";

// TODO Allow Restaurant owners to register their restaurants, registration details include Name, Address , Geo Location. Operation Timings, Contact Numbers.
// TODO Allow Restaurant owners to publish their menu.
// TODO Allow users to search for restaurants by menu item like Paneer Tikka, name, address or geo location( within 5 kms radius) , operation timings.
// TODO Allow users to provide ratings ( 1 to 5 ) to a menu item in a restaurant and overall rating (1 to 5 ) to a restaurant.
// TODO Allow users to search or filter restaurants by item ratings and overall ratings.

const app = express();
const port = 8000;

mongoose.connect("mongodb://localhost:27017/todo", {}, () => {
  console.log("connected to database");
});

app.use(router);

app.listen(port, () => {
  console.log(
    "######################## \n Listening on port: ",
    port,
    "\n########################"
  );
});
