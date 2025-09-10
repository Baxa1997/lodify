import React from "react";
import {Flex} from "@chakra-ui/react";
import SearchInput from "../../components/SearchInput";

const FiltersComponent = () => {
  return (
    <Flex mt={"32px"} p={"12px 16px"} bg={"#FAFAFA"} borderRadius={"12px"}>
      <SearchInput
        placeholder={"Search for name, email, phone..."}
        width={"300px"}
        placeholderStyle={{
          fontSize: "14px",
          fontWeight: "400",
          color: "#717680",
        }}
        bg={"#FAFAFA"}
        focusBorderColor={"#D5D7DA"}
        borderColor={"#D5D7DA"}
        color={"#000"}
        showKeyboardShortcut={false}
      />
    </Flex>
  );
};

export default FiltersComponent;
