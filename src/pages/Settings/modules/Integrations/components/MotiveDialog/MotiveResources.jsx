import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import {Input} from "@chakra-ui/react";

export const MotiveResources = ({
  isOpen,
  onClose = () => {},
  content = {},
  onSubmit = () => {},
  register = () => {},
}) => {
  const shouldShow = content?.type?.[0] === "MOTIVE" && isOpen;

  return (
    <Modal isCentered isOpen={shouldShow} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{content?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={onSubmit} id="motiveResourceForm">
            <Box display="flex" flexDir="column" gap="16px">
              <Input
                {...register("api_key", {
                  required: "API Key is required",
                })}
                placeholder="Enter Motive API Key"
                defaultValue={content?.api_key || ""}
                required
                type="password"
              />
            </Box>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" type="submit" form="motiveResourceForm">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
