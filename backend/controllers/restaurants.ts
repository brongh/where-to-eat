import express from "express";
import { Request, Response, NextFunction } from "express";
import { addressDetails, IRestaurants } from "../interfaces";
import { Restaurants } from "../models";
import { codeToGeo, getPaginator } from "../utils";

const router = express.Router();

router.post("/new", async (req: Request, res: Response, next: NextFunction) => {
  const { address, name, contactNumber } = req.body;

  const result = await codeToGeo(address.postalCode);

  // const updatedAddress: addressDetails = {
  //   ...address,
  //   longitude: result.data.results[0].LONGITUDE,
  //   latitude: result.data.results[0].LATITUDE,
  // };

  // const newRestaurantData: IRestaurants = {
  //   name,
  //   contactNumber,
  //   address: updatedAddress,
  // };

  // const updateRestaurantDetails = await Restaurants.create(newRestaurantData);
  res.send(result);
});

router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
  const { page, skip, limit, query } = getPaginator(req);
  const { postalCode } = req.params;

  const userGeoData = await codeToGeo(postalCode);

  // const filter = query
  //   ? {
  //       $or: [{}],
  //     }
  //   : "";
  // const restaurants = await Restaurants.aggregate([
  //   {
  //     $geoNear: {
  //       near: {type: 'Point', coordinates: []}
  //     }
  //   }
  // ])
  console.log(userGeoData);
  res.send(postalCode);
});

export default router;
