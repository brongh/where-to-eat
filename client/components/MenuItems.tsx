import React, { useState } from "react";
import { Ratings } from "../enums/ratings";
import { Food } from "../interfaces/food";
import { instance } from "../services/api";
import Star from "../svg/Star";
import { ratingColor } from "../utils/ratingColor";
import { parseNum } from "../utils/roundNumbers";
import Col from "./Col";
import Row from "./Row";

interface MenuProps {
  props: Food;
  menuId: string | undefined | null;
}

const MenuItems = ({ props, menuId }: MenuProps) => {
  const [highlights, setHighlights] = useState<Ratings | 0>(0);

  const avgRating = props.rating !== null ? props.rating : 0;
  const parsedAvgRating = parseNum(avgRating);
  const colorStyleRating = ratingColor(avgRating);

  const handleVoting = (rating: number) => {
    instance.post("/ratings/food", {
      foodId: props._id,
      star: rating,
      menuId: menuId,
    });
  };

  return (
    <Col className="border-[1px] border-black rounded-xl p-4 m-2 w-[250px] h-[200px] justify-start items-start">
      <p className="font-semibold text-lg">{props.name}</p>
      <Col className="items-start w-full justify-around h-full">
        <p className="text-sm mt-2">{props.description}</p>
        <Col>
          <div onMouseLeave={() => setHighlights(0)}>
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
          <Row className="space-x-2 mt-2">
            <p className="text-sm font-semibold">Rating: </p>
            <p className="text-sm">
              <span className={`${colorStyleRating}`}>{parsedAvgRating}</span>
              /5
            </p>
          </Row>
          <Row className="space-x-2">
            <p className="text-sm font-semibold">No. Ratings: </p>
            <p className="text-sm">{props.numberOfRatings}</p>
          </Row>
        </Col>
      </Col>
    </Col>
  );
};

export default MenuItems;
