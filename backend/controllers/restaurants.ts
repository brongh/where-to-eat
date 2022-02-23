import express from "express";
import { Request, Response, NextFunction } from "express";
import { addressDetails, IRestaurants } from "../interfaces";
import { Restaurants } from "../models";
import { CustomError } from "../models/custom-error";
import { codeToGeo, getPaginator } from "../utils";

const router = express.Router();

router.post("/new", async (req: Request, res: Response, next: NextFunction) => {
  const { address, name, contactNumber } = req.body;

  const result = await codeToGeo(address.postalCode);

  const coordinates: number[] = [result.longitude, result.latitude];

  const updatedAddress: addressDetails = {
    ...address,
    location: {
      coordinates,
    },
  };

  const newRestaurantData: IRestaurants = {
    name,
    contactNumber,
    address: updatedAddress,
  };

  const updateRestaurantDetails = await Restaurants.create(newRestaurantData);
  res.send(updateRestaurantDetails);
});

router.get(
  "/close",
  async (req: Request, res: Response, next: NextFunction) => {
    const { postalcode, lon, lat } = req.query;

    if (!postalcode && !lon && !lat) {
      throw new CustomError("Invalid Parameters");
    }
    if (!postalcode && lon && lat) {
      const [long, lati] = [
        parseFloat(lon as string),
        parseFloat(lat as string),
      ];
      const coordinates = [long, lati];
      console.log(coordinates);
      const restaurants = await Restaurants.find({
        "address.location": {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: coordinates,
            },
            $maxDistance: 5000,
          },
        },
      });
      res.send(restaurants);
      return;
    }

    const userGeoData = await codeToGeo(
      typeof postalcode === "string" && postalcode
    );
    console.log(userGeoData);

    const coordinates = [userGeoData.longitude, userGeoData.latitude];

    const restaurants = await Restaurants.find({
      "address.location": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: coordinates,
          },
          $maxDistance: 5000,
        },
      },
    });

    res.send(restaurants);
  }
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const allRestaurants = await Restaurants.find();

  res.send(allRestaurants);
});

export default router;
