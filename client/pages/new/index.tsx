import React, { useState } from "react";
import Col from "../../components/Col";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { instance } from "../../services/api";
import LoaderSpinner from "../../components/LoaderSpinner";
import { IRestaurants } from "../../interfaces/restaurants";
import Link from "next/link";

const ManageShop = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState<Boolean>(false);
  const [created, setCreated] = useState<Boolean>(false);
  const [newRest, setNewRest] = useState<IRestaurants | null>();

  const onSubmit: SubmitHandler<any> = (data) => {
    setLoading(true);
    instance.post("/restaurants/new", data).then((res: any) => {
      setNewRest(res.data);
      setLoading(false);
      setCreated(true);
    });
  };
  return (
    <Col className="p-8 items-center w-full">
      <Col className="w-[420px] lg:w-[500px] p-6 rounded-xl border-[1px] border-green-400">
        <h3 className="mb-6">New Restaurant</h3>
        <Input label="Name" register={register} field="name" required />
        <Input
          label="Contact Number"
          register={register}
          field="contactNumber"
          required
        />
        <Input
          label="Street"
          register={register}
          field="address.street"
          required
        />
        <Input
          label="Block"
          register={register}
          field="address.block"
          required={false}
        />
        <Input
          label="Building"
          register={register}
          field="address.building"
          required={false}
        />
        <Input
          label="Postal Code"
          register={register}
          field="address.postalCode"
          required
        />
        <Input
          label="Unit"
          register={register}
          field="address.unit"
          required={false}
        />
        <Button color="teal" className="mt-4" onClick={handleSubmit(onSubmit)}>
          {loading ? <LoaderSpinner /> : "Submit"}
        </Button>
      </Col>
      {created && newRest && newRest._id && (
        <Col className="mt-4 space-y-2 items-center">
          <p>Restaurant created</p>
          <Link href={`/restaurant/${newRest._id}`} passHref>
            <a>
              <Button color="green">Update / View</Button>
            </a>
          </Link>
        </Col>
      )}
    </Col>
  );
};

export default ManageShop;
