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
import { ErrorText } from "../../../../Components/Common/ErrorText/ErrorText";
import { Rug } from "./Rug";
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
    replace(
      fields.map((field) => {
        if (field.id === id) {
          return { value: data, id };
        } else {
          return field;
        }
      })
    );
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
      </Stack>
    </>
  );
};
