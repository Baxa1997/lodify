import React, {useState} from "react";
import {Controller} from "react-hook-form";
import Select from "./Select";
import {Flex} from "@chakra-ui/react";
import tripsService from "../services/tripsService";

function HFSelect({
  control,
  name,
  value = "guid",
  options = [],
  size,
  table_slug = "",
  view_field = "name",
  disabled = false,
  props,
}) {
  const [Internaloptions, setInternalOptions] = useState([]);
  const getOptions = async () => {
    if (table_slug) {
      const response = await tripsService.getSelectOptions(table_slug);
      return setInternalOptions(
        response.data?.response?.map((item) => ({
          label: item[view_field],
          value: item?.[value] ?? item.guid,
        }))
      );
    }
  };

  return (
    <Flex {...props}>
      <Controller
        control={control}
        name={name}
        render={({field}) => (
          <Select
            {...field}
            options={Boolean(table_slug) ? Internaloptions : options}
            onChange={field.onChange}
            size={size}
            onClick={getOptions}
            isDisabled={disabled}
          />
        )}
      />
    </Flex>
  );
}

export default HFSelect;
