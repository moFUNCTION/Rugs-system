import React, { useMemo } from "react";
import {
  Image,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { ImBin2 } from "react-icons/im";
import styles from "./styles.module.css";
function ImageDisplayModal({ isOpen, onClose, src }) {
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              bgColor="gray.100"
              justifyContent="center"
              alignItems="center"
              p="2"
              borderRadius="lg"
            >
              <Image
                h="100%"
                maxH="350px"
                w="100%"
                src={src}
                loading="lazy"
                decoding="async"
                objectFit="contain"
              />
            </Stack>
          </ModalBody>
          <ModalFooter gap="3">
            <Button colorScheme="red" gap="2">
              Remove <ImBin2 />
            </Button>
            <Button onClick={onClose} colorScheme="teal">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export const ImageBox = ({ src, onRemove }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const renderedURL = useMemo(() => {
    return src;
  }, []);
  return (
    <>
      <ImageDisplayModal isOpen={isOpen} src={renderedURL} onClose={onClose} />
      <Stack
        bgColor="gray.100"
        borderRadius="lg"
        overflow="hidden"
        pos="relative"
      >
        <IconButton
          onClick={onRemove}
          pos="absolute"
          top="1"
          right="1"
          colorScheme="red"
          zIndex="10"
        >
          <ImBin2 />
        </IconButton>
        <Image
          src={renderedURL}
          onClick={onOpen}
          cursor="pointer"
          w={"120px"}
          h="120px"
          loading="lazy"
          decoding="async"
          objectFit="cover"
          _active={{
            transform: "scale(.95)",
          }}
          transition="0.3s"
          borderRadius="lg"
          className={styles["image-box"]}
        />
      </Stack>
    </>
  );
};
