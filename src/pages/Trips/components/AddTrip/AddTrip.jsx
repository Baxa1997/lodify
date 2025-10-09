import React, { useEffect, useState } from "react";
import HeadBreadCrumb from "../../../../components/HeadBreadCrumb";
import { Box, Flex, Text, useToast, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import FourthSection from "./FourthSection";
import PackageSection from "./PackageSection";
import TotalRatesSection from "./TotalRatesSection";
import AddressSection from "./AddressSection";
import tripsService from "../../../../services/tripsService";
import { useSelector } from "react-redux";
import { generateID } from "@utils/generateID";

function AddTrip({ tripData = {} }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const userData = useSelector((state) => state?.auth?.user_data);
  const envId = useSelector((state) => state.auth.environmentId);

  const {
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
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
    mutationFn: (data) => {
      return tripsService.createTrip(data);
    },
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

  const updateTripMutation = useMutation({
    mutationFn: (data) => {
      return tripsService.updateTrip(id, data);
    },
    onSuccess: (response) => {
      console.log("Update response:", response);
      toast({
        title: "Trip Updated Successfully",
        description: "The trip has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate("/admin/trips");
    },
    onError: (error) => {
      toast({
        title: "Error Updating Trip",
        description:
          error?.response?.data?.message ||
          "Failed to update trip. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data) => {
    const isUpdate = Boolean(id);
    const dataToSend = {
      data: {
        guid: id,
        app_id: "P-oyMjPNZutmtcfQSnv1Lf3K55J80CkqyP",
        environment_id: envId,
        method: isUpdate ? "update" : "create",
        object_data: {
          main_trip: {
            ...data,
            companies_id: userData?.guid,
            bold_pod: data.bold_pod?.[0],
            rate_confirmation: data.rate_confirmation?.[0],
            ...(isUpdate && { trip_id: id }),
          },
          trip_pickups: data.trip_pickups,
          accessorials: data.accessorials,
        },
        table: "trips",
      },
    };

    if (isUpdate) {
      updateTripMutation.mutate(dataToSend);
    } else {
      createTripMutation.mutate(dataToSend);
    }
  };

  const handleCancel = () => {
    navigate("/admin/trips");
  };

  const handleManualSubmit = () => {
    const formData = watch();
    onSubmit(formData);
  };

  useEffect(() => {
    setValue("generated_id", generateID());
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
    }
  }, [errors]);

  // useEffect(() => {
  //   const subscription = watch((value, {name, type}) => {});
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  return (
    <Box mt={id ? "20px" : "0px"}>
      {!id && (
        <>
          {" "}
          <HeadBreadCrumb />
          <Box
            h={"32px"}
            mb={"30px"}>
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

      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}>
        <FirstSection control={control} />
        <ThirdSection control={control} />

        <PackageSection
          setValue={setValue}
          control={control} />
        <TotalRatesSection control={control} />
        <FourthSection control={control} />
        <AddressSection
          control={control}
          isLoading={
            createTripMutation.isPending || updateTripMutation.isPending
          }
          onCancel={handleCancel}
        />

        <Flex
          mt="20px"
          borderTop="1px solid #E9EAEB"
          pt="20px"
          gap="12px"
          justifyContent="flex-end">
          <Button
            type="button"
            w="80px"
            border="1px solid #E9EAEB"
            borderRadius="8px"
            bg="transparent"
            mr="12px"
            _hover={{ bg: "transparent" }}
            onClick={handleCancel}
            isDisabled={
              createTripMutation.isPending || updateTripMutation.isPending
            }>
            <Text
              ml="6px"
              fontSize="14px"
              fontWeight="600"
              color="#A4A7AE">
              Cancel
            </Text>
          </Button>
          <Button
            w="80px"
            type="button"
            _hover={{ bg: "#1570EF" }}
            bg="#1570EF"
            loadingText="Saving..."
            isLoading={
              createTripMutation.isPending || updateTripMutation.isPending
            }
            onClick={(e) => {
              console.log("=== SUBMIT BUTTON CLICKED ===");
              console.log("Form errors:", errors);
              console.log(
                "Is pending:",
                createTripMutation.isPending || updateTripMutation.isPending,
              );

              // Prevent default form submission and manually trigger
              e.preventDefault();
              console.log("Manually triggering form submission...");
              handleManualSubmit();
            }}>
            <Text
              ml="6px"
              fontSize="14px"
              fontWeight="600"
              color="#fff">
              {createTripMutation.isPending || updateTripMutation.isPending
                ? "Saving..."
                : "Save"}
            </Text>
          </Button>
        </Flex>
      </form>
    </Box>
  );
}

export default AddTrip;
