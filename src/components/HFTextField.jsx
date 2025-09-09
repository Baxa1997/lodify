import {Input} from "@chakra-ui/react";
import React from "react";
import {Controller} from "react-hook-form";

function HFTextField({
  control,
  name,
  label,
  placeholder,
  type = "text",
  ...props
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({field}) => (
        <Input
          {...field}
          label={label}
          placeholder={placeholder}
          type={type}
          {...props}
        />
      )}
    />
  );
}

export default HFTextField;
