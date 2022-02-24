import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RestaurantList, {
  RestaurantListProps,
} from "../../components/RestaurantLists";
import { instance } from "../../services/api";
import { IRestaurants } from "../../interfaces/restaurants";
import Col from "../../components/Col";

const RestaurantPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [rest, setRest] = useState<IRestaurants | null>();
  useEffect(() => {
    if (id) {
      instance.get(`/restaurants/find?id=${id}`).then((data: any) => {
        setRest(data.data);
      });
    }
  }, [id]);
  return (
    <Col className="mx-8">
      {rest !== null && rest !== undefined ? (
        <RestaurantList props={rest} />
      ) : (
        <h3>No Restaurants</h3>
      )}
    </Col>
  );
};

export default RestaurantPage;
