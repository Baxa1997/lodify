import { Box, Input } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const HFTextField = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  required,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Box width="100%">
          {label && <Box
            as="label"
            color="#414651"
            fontWeight={500}
            mb="6px"
            display="block"
            htmlFor={name}
          >
            {label}
            {required && <Box
              as="span"
              color="blue.500"
            >*</Box>}
          </Box>}
          <Input
            {...field}
            label={label}
            placeholder={placeholder}
            type={type}
            px={"12px"}
            py={"8px"}
            id={name}
            _disabled={{
              bg: "gray.bg.disabled",
              color: "gray.color.disabled",
            }}
            {...props}
          />
        </Box>
      )}
    />
  );
};

export default HFTextField;
