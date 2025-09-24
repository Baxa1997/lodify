import React, {useCallback, useState} from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  VStack,
  HStack,
  Select,
  useToast,
} from "@chakra-ui/react";
import {useForm, Controller} from "react-hook-form";
import "react-international-phone/style.css";
import styles from "../style.module.scss";
import {useQueryClient} from "@tanstack/react-query";
import {useSelector} from "react-redux";
import clientsService from "../../../services/clientsService";
import HFFileUpload from "@components/HFFileUpload";
import HFTextField from "@components/HFTextField";

const AddShipperModal = ({isOpen, onClose, text = '"Create Asset"'}) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const userInfo = useSelector((state) => state.auth);
  const toast = useToast();

  const handleAddAsset = useCallback(
    async (assetData) => {
      try {
        const apiData = {
          data: {
            name: assetData.name,
            logo: assetData.logo,
          },
        };

        await clientsService.createShipper(apiData);

        queryClient.invalidateQueries({queryKey: ["CLIENTS_LIST"]});
        handleClose();
        setLoading(false);

        toast({
          title: "Shipper Added Successfully!",
          description: "The shipper has been created and added to the system",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      } catch (error) {
        setLoading(false);
        console.error("Error adding shipper:", error);

        toast({
          title: "Error Adding Shipper",
          description:
            error?.response?.data?.message ||
            "Failed to add shipper. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    },
    [queryClient, userInfo]
  );

  const {
    control,
    handleSubmit: handleFormSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      logo: "",
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    handleAddAsset(data);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg" isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, 0.5)" />
      <ModalContent className={styles.modalContent}>
        <ModalHeader className={styles.modalHeader}>
          <Text className={styles.modalTitle}>Add Shipper</Text>
          <Button onClick={handleClose} className={styles.headCloseButton}>
            <img src="/img/cancelIcon.svg" alt="close" />
          </Button>
        </ModalHeader>

        <ModalBody className={styles.modalBody}>
          <form onSubmit={handleFormSubmit(onSubmit)}>
            <VStack spacing={4} align="stretch" flex="1">
              <FormControl isInvalid={!!errors.name}>
                <FormLabel className={styles.fieldLabel}>
                  Shipper name <span className={styles.required}>*</span>
                </FormLabel>
                <HFTextField
                  name="name"
                  border="1px solid #E2E8F0"
                  control={control}
                  placeholder="Shipper name"
                  rules={{required: "Shipper name is required"}}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.logo}>
                <FormLabel className={styles.fieldLabel}>
                  Logo <span className={styles.required}>*</span>
                </FormLabel>
                <HFFileUpload name="logo" control={control} />
              </FormControl>
            </VStack>

            <HStack spacing={3} justify="flex-end" mt={1}>
              <Button onClick={handleClose} type="button" variant="outline">
                Close
              </Button>
              <Button
                type="submit"
                className={styles.sendInviteButton}
                isDisabled={!isValid || loading}>
                {loading ? "Creating..." : text}
              </Button>
            </HStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddShipperModal;
