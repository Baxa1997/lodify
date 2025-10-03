import React, {useEffect, useState} from "react";
import HeadBreadCrumb from "../../../../components/HeadBreadCrumb";
import {Box, Flex, Text, useToast} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
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

function AddTrip({tripData = {}}) {
  const {id} = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const userData = useSelector((state) => state?.auth?.user_data);
  const envId = useSelector((state) => state.auth.environmentId);

  const {
    reset,
    setValue,
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();

  const transformTripData = (data) => {
    if (!data || Object.keys(data).length === 0) return {};

    return {
      ...data,
      rate_confirmation: data.rate_confirmation ? [data.rate_confirmation] : [],
      bold_pod: data.bol_pod ? [data.bol_pod] : [],
      other_files: data.other_files ? [data.other_files] : [],

      shippers_id: data.shipper?.guid || data.shippers_id,
      companies_id_2: data.created_by?.guid || data.companies_id_2,

      driver_type: Array.isArray(data.driver_type)
        ? data.driver_type
        : data.driver_type
        ? [data.driver_type]
        : [],
      trip_type: Array.isArray(data.trip_type)
        ? data.trip_type
        : data.trip_type
        ? [data.trip_type]
        : [],
      status: Array.isArray(data.status)
        ? data.status
        : data.status
        ? [data.status]
        : [],

      lodify_fees_id: data.lodify_fee?.guid || data.lodify_fees_id,
      service_fee: data.lodify_fee?.amount || data.service_fee,

      trip_pickups: Array.isArray(data.pickups) ? data.pickups : [],

      accessorials: Array.isArray(data.accessorials) ? data.accessorials : [],
    };
  };

  useEffect(() => {
    const transformedData = transformTripData(tripData);
    reset(transformedData);
  }, [tripData]);

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
    console.log("data", data);
    const dataToSend = {
      data: {
        app_id: "P-oyMjPNZutmtcfQSnv1Lf3K55J80CkqyP",
        environment_id: envId,
        method: Boolean(id) ? "update" : "create",
        object_data: {
          main_trip: {
            ...data,
            companies_id: userData?.guid,
            bold_pod: data.bold_pod?.[0],
            rate_confirmation: data.rate_confirmation?.[0],
          },
          trip_pickups: data.trip_pickups,
          accessorials: data.accessorials,
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
    <Box mt={Boolean(id) ? "20px" : "0px"}>
      {!Boolean(id) && (
        <>
          {" "}
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
        </>
      )}

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
    </Box>
  );
}

export default AddTrip;
