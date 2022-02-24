import React, { useContext, useEffect, useState } from "react";
import Col from "../../../components/Col";
import { useRouter } from "next/router";
import { IRestaurants } from "../../../interfaces/restaurants";
import { instance } from "../../../services/api";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Row from "../../../components/Row";
import { SocketContext } from "../../../context/socket";
import NewFoodItem from "../../../components/NewFoodItem";
import { Food } from "../../../interfaces/food";
import EditFood from "../../../components/EditFood";

const EditRestaurant = () => {
  const router = useRouter();
  const { id } = router.query;
  const [rest, setRest] = useState<IRestaurants | null>();
  const [addItem, setAddItem] = useState<Boolean>(false);

  const socket = useContext(SocketContext);
  const [socs, setSocs] = useState();

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

  socket.on("updated-menu", (res) => setSocs(res));

  const defaultValues: any = {
    _id: rest && rest._id,
    name: rest && rest.name,
    contactNumber: rest && rest.contactNumber,
    ratingRecord: rest && rest.ratingRecord,
    address: rest && rest.address,
  };

  const { register, handleSubmit, watch, reset } = useForm(defaultValues);
  useEffect(() => {
    if (id) {
      instance.get(`/restaurants/find?id=${id}`).then((data: any) => {
        setRest(data.data);
        reset(data.data);
      });
    }
  }, [id, socs]);

  const resetRestaurantData = () => {
    instance.get(`/restaurants/find?id=${id}`).then((data: any) => {
      setRest(data.data);
      reset(data.data);
    });
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    instance.put("/restaurants/edit", data);
  };

  return (
    <Col className="w-full px-4 items-center py-4">
      <Col className="border-[1px] border-green-400 rounded-xl p-6">
        <h3 className="mb-8">Edit Restaurant details</h3>
        <Row className="space-x-4">
          <Input
            label="Name"
            register={register}
            field="name"
            required={false}
          />
          <Input label="Number" register={register} field="contactNumber" />
        </Row>
        <Row className="space-x-4">
          <Input label="Street" register={register} field="address.street" />
          <Input label="Block" register={register} field="address.block" />
        </Row>
        <Row className="space-x-4">
          <Input
            label="Postal Code"
            register={register}
            field="address.postalCode"
          />
          <Input label="Unit" register={register} field="address.unit" />
        </Row>

        <Button color="green" className="mt-6" onClick={handleSubmit(onSubmit)}>
          Confirm
        </Button>
        <Button
          color="purple"
          className="mt-2"
          onClick={() => {
            resetRestaurantData();
          }}
        >
          Reset
        </Button>
      </Col>
      <Col className="p-6 items-center border-[1px] border-purple-400 rounded-xl my-10">
        <h3>Edit Menu</h3>
        <Row className="my-4">
          <Button
            color="purple"
            onClick={() => {
              setAddItem(!addItem);
            }}
          >
            Add new item
          </Button>
          {addItem && <NewFoodItem id={id as string} />}
        </Row>
        <Row className="my-4 flex-wrap">
          {rest &&
            rest.menu &&
            rest.menu.item.map((item: Food, index: number) => {
              return (
                <EditFood
                  props={item}
                  restaurantId={rest._id as string}
                  key={index}
                />
              );
            })}
        </Row>
      </Col>
    </Col>
  );
};

export default EditRestaurant;
