import { Schema, model, Types, Document } from "mongoose";
import { IMenu } from "../interfaces";
import { findAverage } from "../utils";

const foodItemSchema = new Schema({
  name: String,
  price: String,
  description: String,
  archive: Boolean,
  available: Boolean,
  ratingRecord: [Number],
});

const menuSchema = new Schema(
  {
    item: [foodItemSchema],
    restaurant: { type: Types.ObjectId, ref: "restaurants" },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

foodItemSchema.virtual("rating").get(function () {
  return findAverage(this.ratingRecord);
});

foodItemSchema.virtual("numberOfRatings").get(function () {
  return this.ratingRecord.length;
});

// menuSchema.index({
//   restaurant: 1,
// });

const Menus = model<IMenu & Document>("menus", menuSchema);

// Menus.createIndexes();

export default Menus;
