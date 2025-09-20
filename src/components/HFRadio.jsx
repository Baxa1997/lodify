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
          value={field.value}
          {...props}
          onChange={(e) => field.onChange(e.target.checked)}
        />
      )}
    />
  );
}

export default HFRadio;
