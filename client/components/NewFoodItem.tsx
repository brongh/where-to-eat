import React, { useState } from "react";
import Col from "./Col";
import Input from "./Input";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "./Button";
import { instance } from "../services/api";
import LoaderSpinner from "./LoaderSpinner";

interface NewFoodProps {
  id: string;
}

const NewFoodItem = ({ id }: NewFoodProps) => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [added, setAdded] = useState<Boolean>(false);
  const defaultValues: any = {
    name: "",
    price: "",
    description: "",
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    setLoading(true);
    const toAdd = {
      foodItems: data,
      restaurantId: id,
    };
    instance.post("/menus/add", toAdd).then(() => {
      setLoading(false);
      setAdded(true);
      reset(defaultValues);
    });
  };

  const { register, handleSubmit, watch, reset } = useForm(defaultValues);
  return (
    <Col className="ml-6 rounded-xl p-4 border-[1px] border-green-400 bg-green-400">
      <h3 className="mb-4">Food Item</h3>
      <Input label="Name" register={register} field="name" />
      <Input label="Price" register={register} field="price" />
      <Input label="Description" register={register} field="description" />
      <Button color="purple" className="mt-4" onClick={handleSubmit(onSubmit)}>
        {loading ? <LoaderSpinner /> : added ? "Item Added" : "Add to Menu"}
      </Button>
    </Col>
  );
};

export default NewFoodItem;
