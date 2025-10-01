import React, {useEffect, useState} from "react";
import HeadBreadCrumb from "../../../../components/HeadBreadCrumb";
import {Box, Flex, Text, useToast} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import FourthSection from "./FourthSection";
import PackageSection from "./PackageSection";
import TotalRatesSection from "./TotalRatesSection";
import AddressSection from "./AddressSection";
import tripsService from "../../../../services/tripsService";
import {useSelector} from "react-redux";
import {generateID} from "@utils/generateID";

function AddTrip() {
  const navigate = useNavigate();
  const toast = useToast();
  const userData = useSelector((state) => state?.auth?.user_data);
  const envId = useSelector((state) => state.auth.environmentId);

  const {
    setValue,
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();

  const createTripMutation = useMutation({
    mutationFn: (data) => tripsService.createTrip(data),
    onSuccess: (response) => {
      toast({
        title: "Trip Created Successfully",
        description: "The trip has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate("/admin/trips");
    },
    onError: (error) => {
      toast({
        title: "Error Creating Trip",
        description:
          error?.response?.data?.message ||
          "Failed to create trip. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data) => {
    const dataToSend = {
      data: {
        app_id: "P-oyMjPNZutmtcfQSnv1Lf3K55J80CkqyP",
        environment_id: envId,
        method: "create",
        object_data: {
          main_trip: {
            ...data,
            companies_id: userData?.guid,
            bold_pod: data.bold_pod?.[0],
            rate_confirmation: data.rate_confirmation?.[0],
          },
          trip_pickups: data.trip_pickups,
        },
        table: "trips",
      },
    };

    createTripMutation.mutate(dataToSend);
  };

  const handleCancel = () => {
    navigate("/admin/trips");
  };

  useEffect(() => {
    setValue("generated_id", generateID());
  }, []);

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
        <ThirdSection control={control} />

        <PackageSection setValue={setValue} control={control} />
        <TotalRatesSection control={control} />
        <FourthSection control={control} />
        <AddressSection
          control={control}
          isLoading={createTripMutation.isPending}
          onCancel={handleCancel}
        />
      </form>
    </>
  );
}

export default AddTrip;
