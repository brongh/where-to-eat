import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Col from "../components/Col";
import LoaderSpinner from "../components/LoaderSpinner";
import RestaurantList from "../components/RestaurantLists";
import { GeoTypes } from "../interfaces/geo";
import { IRestaurants } from "../interfaces/restaurants";
import { instance } from "../services/api";

interface HomeProps {
  allRestaurants: any;
}

const Home: NextPage<HomeProps> = ({ allRestaurants }) => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [located, setLocated] = useState<Boolean>(false);
  const [restaurants, setRestaurants] =
    useState<IRestaurants[]>(allRestaurants);
  const [geo, setGeo] = useState<GeoTypes>({
    longitude: 0,
    latitude: 0,
  });

  const handleLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!navigator.geolocation) {
      alert("Your browser does not support geolocation");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;
      setGeo({ longitude, latitude });

      return;
    });
  };

  const locateButtonText = () => {
    let txt = "Locate me!";
    if (located) {
      txt = "Located!";
    }
    return txt;
  };

  useEffect(() => {
    if (geo.longitude !== 0 && geo.latitude !== 0)
      instance
        .get(`/restaurants/close?lon=${geo.longitude}&lat=${geo.latitude}`)
        .then((data: any) => {
          console.log("data: ", data);
          setRestaurants(data.data);
          setLoading(false);
          setLocated(true);
        });
  }, [geo]);
  return (
    <Col className="items-center p-8">
      <div className="mb-6">
        <Button color="teal" onClick={handleLocation}>
          {loading ? (
            <LoaderSpinner />
          ) : (
            <p className="font-semibold">{locateButtonText()}</p>
          )}
        </Button>
      </div>
      <Col className="w-full">
        {restaurants.map((item: IRestaurants, index: number) => {
          return <RestaurantList props={item} key={index} />;
        })}
      </Col>
    </Col>
  );
};

export default Home;

export const getStaticProps = async () => {
  const res = await instance.get("/restaurants");
  const allRestaurants = JSON.stringify(res.data);
  return {
    props: {
      allRestaurants: res.data,
    },
  };
};
