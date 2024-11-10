import {
  Button,
  Flex,
  IconButton,
  Stack,
  useDisclosure,
  Image,
  Box,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useFieldArray } from "react-hook-form";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import {} from "@chakra-ui/react";
import { RugModal } from "./RugModal";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
export const Rugs = ({ control, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "RugsUploaded",
  });
  const {
    isOpen: isOpenedRugModal,
    onOpen: onOpenRugModal,
    onClose: onCloseRugModal,
  } = useDisclosure();

  const onAddRug = (data) => {
    append({
      value: data,
    });
    onCloseRugModal();
  };
  const onDeleteRug = (index) => {
    remove(index);
  };

  return (
    <>
      <RugModal
        key={isOpenedRugModal}
        onSubmit={onAddRug}
        isOpen={isOpenedRugModal}
        onClose={onCloseRugModal}
      />
      <Stack borderRadius="lg" alignItems="center" bgColor="gray.200" p="3">
        {fields?.length > 0 ? (
          <>
            <Button
              onClick={onOpenRugModal}
              size="sm"
              ml="auto"
              colorScheme="red"
            >
              Add A New Rug
            </Button>
            {fields.map((field, index) => {
              const {
                RugCleaningOption,
                width,
                length,
                RugMaterial,
                AdditionalServices,
                Comment,
              } = field.value;
              return (
                <Flex
                  gap="3"
                  borderRadius="lg"
                  bgColor="white"
                  p="3"
                  key={field.id}
                  w="100%"
                  pos="relative"
                >
                  <IconButton
                    colorScheme="red"
                    pos="absolute"
                    top="1"
                    right="1"
                    onClick={() => onDeleteRug(index)}
                  >
                    <MdCancel />
                  </IconButton>
                  {RugCleaningOption?.RugImages && (
                    <Image
                      borderRadius="lg"
                      w="120px"
                      h="120px"
                      objectFit="cover"
                      src={URL.createObjectURL(
                        RugCleaningOption.RugImages[0]?.value
                      )}
                    />
                  )}
                  <Stack gap="0">
                    <Heading size="sm">Rug {index + 1}</Heading>
                    <Text size="sm">Rug Width : {width + 1}m</Text>
                    <Text size="sm">Rug length : {length + 1}m</Text>
                    <Text size="sm">Rug Material : {RugMaterial + 1}</Text>
                    <Text>
                      Additional Services Selected :{" "}
                      {AdditionalServices.map((value) => {
                        return value.label;
                      })}
                    </Text>
                  </Stack>
                </Flex>
              );
            })}
          </>
        ) : (
          <Button
            onClick={onOpenRugModal}
            w="100%"
            variant="outline"
            bgColor="white"
            colorScheme="red"
            borderStyle="dashed"
            size="lg"
          >
            Add Your First Rug
          </Button>
        )}
      </Stack>
    </>
  );
};
