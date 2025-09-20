import React from "react";
import HeadBreadCrumb from "../../../../components/HeadBreadCrumb";
import {Box, Flex, Text} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import FourthSection from "./FourthSection";
import AddressSection from "./AddressSection";

function AddTrip() {
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <HeadBreadCrumb />
      <Box h={"32px"} mb={"30px"}>
        <Text
          mt="16px"
          fontSize={"24px"}
          h={"32px"}
          color={"#181D27"}
          fontWeight={"600"}>
          Add Trip
        </Text>
      </Box>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <FirstSection control={control} />
        <SecondSection control={control} />
        <ThirdSection control={control} />
        <FourthSection control={control} />
        <AddressSection control={control} />
      </form>
    </>
  );
}

export default AddTrip;
