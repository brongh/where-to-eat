import React from "react";

import { Path, UseFormRegister } from "react-hook-form";
import Row from "./Row";

type InputProps = {
  label: string;
  register: UseFormRegister<any>;
  required?: boolean;
  field: string;
  value?: string;
  type?: string;
};

const Input = ({
  label,
  register,
  required,
  field,
  value,
  type,
}: InputProps) => {
  return (
    <Row className="space-x-3 items-center my-2">
      <label className="font-poppins w-[150px]">{label}</label>
      <input
        {...register(field, { required })}
        value={value}
        type={type ? type : "text"}
        className="border-[1px] border-black rounded-lg p-1 focus:ring focus:ring-green-500"
      />
      {required && <p className="text-red-600">*</p>}
    </Row>
  );
};

export default Input;
