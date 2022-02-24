import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import Col from "../components/Col";
import LoaderSpinner from "../components/LoaderSpinner";
import RestaurantList from "../components/RestaurantLists";
import Row from "../components/Row";
import { UserContext } from "../context/admin";
import { SocketContext } from "../context/socket";
import { GeoTypes } from "../interfaces/geo";
import { IRestaurants } from "../interfaces/restaurants";
import { instance } from "../services/api";

interface HomeProps {
  allRestaurants: any;
}

const Home: NextPage<HomeProps> = ({ allRestaurants }) => {
  const socket = useContext(SocketContext);
  const [context, setContext] = useContext(UserContext);

  const [search, setSearch] = useState("");

  const [socs, setSocs] = useState<any>();

  useEffect(() => {
    socket.emit("connection");
    socket.on("connection", () => {
      console.log("joined");
    });
    return () => {
      socket.off("disconnect", () => {
        console.log("disconnected");
      });
    };
  }, []);

  socket.on("rated-food", (res) => {
    setSocs(res);
  });
  socket.on("rated-restaurant", (res) => {
    setSocs(res);
  });
  socket.on("created-restaurant", (res) => {
    setSocs(res);
  });

  const [loading, setLoading] = useState<Boolean>(false);
  const [located, setLocated] = useState<Boolean>(false);
  const [restaurants, setRestaurants] =
    useState<IRestaurants[]>(allRestaurants);
  const [geo, setGeo] = useState<GeoTypes>({
    longitude: 0,
    latitude: 0,
  });

  // useEffect(() => {
  //   if (located && geo.longitude !== 0 && geo.latitude !== 0) {

  //   }
  // },[socs])

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
    if (geo.longitude !== 0 && geo.latitude !== 0) {
      instance
        .get(
          `/restaurants/close?lon=${geo.longitude}&lat=${geo.latitude}&search=${search}`
        )
        .then((data: any) => {
          setRestaurants(data.data);
          setLoading(false);
          setLocated(true);
        });
      return;
    }
    instance
      .get(`/restaurants${search ? `?search=${search}` : ""}`)
      .then((data: any) => {
        setRestaurants(data.data);
      });
  }, [geo, socs, search]);

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <Col className="items-center p-8">
      <Row className="mb-6">
        <Button color="teal" onClick={handleLocation}>
          {loading ? (
            <LoaderSpinner />
          ) : (
            <p className="font-semibold">{locateButtonText()}</p>
          )}
        </Button>
        <Row className="space-x-4 items-center mx-6 border-[1px] border-green-500 px-4 rounded-lg bg-green-400">
          <p className="font-semibold">Search</p>
          <input
            className="border-[1px] border-green-500 px-3 py-1 rounded-lg"
            onChange={handleSearch}
            value={search}
          />
        </Row>
      </Row>
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
