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
import { calculateTreatmentPrice } from "../../../../Utils/RugsTotalPrice/RugsTotalPrice";
const RemovingModal = ({ onClose, isOpen, treatment, onDelete }) => {
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
        <ModalHeader>Remove Treatment Selected</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading size="md">
            Are you sure that you want to remove <span>{treatment.value}</span>
            {"___"}
            <span>{treatment.price} £</span>
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
export const TreatmentSelected = ({ value, price, onDelete, rugSize }) => {
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();
  return (
    <>
      <RemovingModal
        treatment={{
          value,
          price,
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
          <Text whiteSpace="wrap">{value}</Text>
        </Flex>
        <Text>
          {calculateTreatmentPrice(
            {
              value,
              price,
            },
            rugSize
          )}
          £
        </Text>
      </Flex>
    </>
  );
};
