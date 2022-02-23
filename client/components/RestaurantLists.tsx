import React, { useState } from "react";
import { Food } from "../interfaces/food";
import { IRestaurants } from "../interfaces/restaurants";
import { ratingColor } from "../utils/ratingColor";
import Button from "./Button";
import Col from "./Col";
import MenuItems from "./MenuItems";
import Row from "./Row";
import Star from "../svg/Star";
import { Ratings } from "../enums/ratings";
import { instance } from "../services/api";
import { parseNum } from "../utils/roundNumbers";

export interface RestaurantListProps {
  props: IRestaurants;
}

const RestaurantList = ({ props }: RestaurantListProps) => {
  const [highlights, setHighlights] = useState<Ratings | 0>(0);
  const score = props.rating !== null ? props.rating : 0;
  const parsedScore = parseNum(score);

  const colorStyleRating = ratingColor(score);

  const handleVoting = (rating: number) => {
    instance.post("/ratings/restaurant", {
      restaurantId: props._id,
      star: rating,
    });
  };

  return (
    <Col className="w-full border-[1px] border-green-400 rounded-xl pb-4 my-4">
      <Row className="justify-center border-b-[1px] rounded-t-xl border-green-400 py-4 bg-green-400">
        <h3 className="text-white">{props.name}</h3>
      </Row>
      <Row className="items-center border-b-[1px] border-green-400 py-4 space-x-4 px-2">
        <Button color="purple">Menu</Button>
        <Row className=" w-full overflow-x-auto flex-wrap">
          {props.menu && props.menu.item.length > 0 && props.menu._id ? (
            props.menu.item.map((foodItem: Food, index: number) => {
              return (
                <MenuItems
                  props={foodItem}
                  key={index}
                  menuId={props.menu && props.menu._id}
                />
              );
            })
          ) : (
            <p className=" mx-auto">No items added to menu yet</p>
          )}
        </Row>
      </Row>
      <Row className="p-4 items-start justify-evenly flex-wrap">
        <Col className=" xl:w-[300px] m-2">
          <Row className="space-x-2">
            <p className="font-semibold">Address: </p>
            <p>{props.address.street}</p>
          </Row>
          <Row className="space-x-2">
            <p className="font-semibold">Blk: </p>
            <p>{props.address.block}</p>
          </Row>
          <Row className="space-x-2">
            <p className="font-semibold">Postal Code: </p>
            <p>{props.address.postalCode}</p>
          </Row>
        </Col>
        <Col className="w-[300px] m-2">
          <Row className="space-x-2">
            <p className="font-semibold">Number: </p>
            <p>{props.contactNumber}</p>
          </Row>
        </Col>
        <Col className="w-[300px] m-2">
          <div
            onMouseLeave={() => {
              setHighlights(0);
            }}
          >
            <Row className="mb-2">
              {Array.from(Array(5).keys()).map((item: number) => {
                const value = item + 1;
                let shouldHighlight: boolean = false;
                if (highlights >= value) {
                  shouldHighlight = true;
                }

                return (
                  <div
                    onMouseEnter={() => {
                      setHighlights(value);
                    }}
                    className="cursor-pointer"
                    key={item}
                    onClick={() => handleVoting(value)}
                  >
                    <Star highlight={shouldHighlight} />
                  </div>
                );
              })}
            </Row>
          </div>
          <Row className="space-x-2">
            <p className="font-semibold">Rating: </p>
            <p>
              <span className={`${colorStyleRating}`}>{parsedScore}</span>/5
            </p>
          </Row>
          <Row className="space-x-2">
            <p className="text-sm">Total Number of Ratings: </p>
            <p className="text-sm">{props.numberOfRatings}</p>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default RestaurantList;
