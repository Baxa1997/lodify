import React, {useEffect, useState} from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Text,
  ModalBody,
  Button,
  Flex,
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import HFFilesField from "@components/HFFilesField";
import {useNavigate} from "react-router-dom";

function AutomatedAddTrip({isOpen, onClose}) {
  const navigate = useNavigate();
  const {control, watch} = useForm();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const uploadedFile = watch("csv");

  useEffect(() => {
    console.log("uploadedFileuploadedFile", uploadedFile);
    if (Boolean(uploadedFile?.[0])) {
      console.log("uploadedFileuploadedFile", uploadedFile);
      setIsNavigating(true);
      setTimeout(() => {
        setIsNavigating(false);
        navigate("/admin/trips/add-trip", {
          state: {
            csv: uploadedFile,
          },
        });
      }, 3000);
    }
  }, [uploadedFile]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Automated By Lodify AI</ModalHeader>

        <ModalBody>
          <HFFilesField
            setUploadLoading={setUploadLoading}
            name="csv"
            label="Upload"
            required
            control={control}
          />
          <Flex mt="16px" justifyContent="end">
            <Button
              isDisabled={isNavigating || !uploadLoading}
              isLoading={uploadLoading}
              bg="#EF6820"
              color="white"
              _hover={{bg: "#EF6820"}}>
              {isNavigating ? "Navigating..." : "Upload"}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AutomatedAddTrip;
