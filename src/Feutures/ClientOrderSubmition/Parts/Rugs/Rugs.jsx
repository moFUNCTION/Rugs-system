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
import { RugModal } from "./RugModal";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { ErrorText } from "../../../../Components/Common/ErrorText/ErrorText";
import { Rug } from "./Rug";
import { sumTotalPrice } from "../../../../Utils/RugsTotalPrice/RugsTotalPrice";
export const Rugs = ({ control, setValue, errors }) => {
  const { fields, append, remove, replace } = useFieldArray({
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
  const onUpdateRug = ({ id, data }) => {
    console.log(data);
    replace(
      fields.map((field) => {
        if (field.id === id) {
          return { value: { ...data, totalPrice: sumTotalPrice([data]) }, id };
        } else {
          return field;
        }
      })
    );
  };
  const TotalPrice = sumTotalPrice(fields.map((field) => field.value));
  return (
    <>
      <RugModal
        key={isOpenedRugModal}
        onSubmit={onAddRug}
        isOpen={isOpenedRugModal}
        onClose={onCloseRugModal}
      />
      <Stack
        w="100%"
        borderRadius="lg"
        alignItems="center"
        bgColor="gray.200"
        p="3"
      >
        <ErrorText>{errors?.RugsUploaded?.message}</ErrorText>
        {fields?.length > 0 ? (
          <>
            <Button
              onClick={() => {
                onOpenRugModal();
              }}
              size="sm"
              ml="auto"
              colorScheme="red"
            >
              Add A New Rug
            </Button>
            {fields.map((field, index) => {
              return (
                <Rug
                  onUpdate={(data) => onUpdateRug({ data, id: field.id })}
                  onDelete={() => onDeleteRug(index)}
                  key={field.id}
                  index={index}
                  {...field.value}
                />
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
        <Button colorScheme="green" w="100%" p="3">
          Rugs Total Price : {TotalPrice}
        </Button>
      </Stack>
    </>
  );
};
