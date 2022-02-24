import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { instance } from "../services/api";
import Button from "./Button";
import Col from "./Col";
import Input from "./Input";
import LoaderSpinner from "./LoaderSpinner";
import { Food } from "../interfaces/food";

interface EditFoodProps {
  props: Food;
  restaurantId: string;
}

const EditFood = ({ props, restaurantId }: EditFoodProps) => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [added, setAdded] = useState<Boolean>(false);
  const defaultValues: any = {
    name: props.name,
    price: props.price,
    description: props.description,
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    setLoading(true);
    const toAdd = {
      foodItems: data,
      restaurantId,
    };
    // instance.put("/menus/update", toAdd).then(() => {
    //   setLoading(false);
    //   setAdded(true);
    // });
    console.log(toAdd);
  };

  useEffect(() => {
    reset(props);
  }, []);

  const { register, handleSubmit, watch, reset } = useForm(defaultValues);
  return (
    <Col className="ml-6 rounded-xl p-4 border-[1px] border-green-400 m-4">
      <h3 className="mb-4">Edit {props && props.name}</h3>
      <Input label="Name" register={register} field="name" />
      <Input label="Price" register={register} field="price" />
      <Input label="Description" register={register} field="description" />
      <Button color="green" className="mt-4" onClick={handleSubmit(onSubmit)}>
        {loading ? <LoaderSpinner /> : added ? "Confirmed" : "Confirm"}
      </Button>
    </Col>
  );
};

export default EditFood;
