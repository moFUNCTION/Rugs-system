import React from "react";
import {
  Checkbox,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Badge,
} from "@chakra-ui/react";
import { MdRemove } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { calculateAdditionalServicePrice } from "../../../../Utils/RugsTotalPrice/RugsTotalPrice";
const RemovingModal = ({ onClose, isOpen, service, onDelete }) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remove Additional Services Selected</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading size="md">
            Are you sure that you want to remove <span>{service.label}</span>
            {"___"}
            <span>{service.price} £</span>
          </Heading>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="red" onClick={onDelete}>
            Remove
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export const AdditionalServicesSelected = ({
  value,
  price,
  onDelete,
  label,
  rugSize,
}) => {
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();
  return (
    <>
      <RemovingModal
        service={{
          value,
          price,
          label,
        }}
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        onDelete={onDelete}
      />
      <Flex flexWrap="wrap" border="1px" p="3" justifyContent="space-between">
        <Flex flexWrap="wrap" gap="3" alignItems="center">
          <IconButton
            onClick={onOpenDeleteModal}
            size="sm"
            variant="outline"
            colorScheme="blackAlpha"
          >
            <IoCloseOutline />
          </IconButton>
          <Text whiteSpace="wrap">{label}</Text>
        </Flex>
        <Text>{calculateAdditionalServicePrice(price, rugSize)}£</Text>
      </Flex>
    </>
  );
};
