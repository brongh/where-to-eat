import { Schema, model, Types, Document } from "mongoose";
import { IRestaurants } from "../interfaces";
import { findAverage } from "../utils";

const restaurantSchema = new Schema(
  {
    name: { type: String, required: true },
    contactNumber: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      postalCode: { type: String, required: true },
      building: { type: String },
      block: { type: String },
      unit: { type: String },
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
    },
    ratingRecord: Array<Number>
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
  }
);

restaurantSchema.virtual("rating").get(function() {
  return findAverage(this.ratingRecord)
})

restaurantSchema.virtual("numberOfRatings").get(function() {
  return this.ratingRecord.length;
})

restaurantSchema.virtual("operatingHours", {
  ref: "operatingHours",
  localField: "_id",
  foreignField: "restaurant",
  justOne: true,
});

restaurantSchema.virtual("menu", {
  ref: "menus",
  localField: "_id",
  foreignField: "restaurant",
  justOne: true
})

const autoPopulateRestaurant = function (next: any) {
  this.populate("operatingHours");
  this.populate("menu")
  next();
};

restaurantSchema.pre("findOne", autoPopulateRestaurant);

restaurantSchema.index({
  name: "text",
  "address.longitude": 1,
  "address.latitude": 1,
});

const Restaurants = model<IRestaurants & Document>(
  "restaurants",
  restaurantSchema
);

Restaurants.createIndexes();

export default Restaurants;