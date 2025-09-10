import {Input} from "@chakra-ui/react";
import React from "react";
import {Controller} from "react-hook-form";

const HFTextField = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  ...props
}) => {
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
          px={"12px"}
          py={"8px"}
          {...props}
        />
      )}
    />
  );
};

export default HFTextField;
