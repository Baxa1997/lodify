import React from "react";
import {Controller} from "react-hook-form";
import {Radio} from "@chakra-ui/react";

function HFRadio({control, name, ...props}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({field}) => (
        <Radio
          {...field}
          {...props}
          isChecked={field.value === props.value}
          onChange={(e) => field.onChange(e.target.value)}
        />
      )}
    />
  );
}

export default HFRadio;
