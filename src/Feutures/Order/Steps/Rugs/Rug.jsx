import React from "react";
import {
  Flex,
  IconButton,
  Stack,
  Image,
  Text,
  Heading,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { MdCancel } from "react-icons/md";
import { RugModal } from "./RugModal";
export const Rug = ({ onDelete, onUpdate, index, ...data }) => {
  const {
    isOpen: isRugModalDetailsOpened,
    onOpen: onOpenRugModalDetails,
    onClose: onCloseReyugModalDetails,
  } = useDisclosure();
  const {
    RugCleaningOption,
    width,
    RugMaterial,
    AdditionalServices,
    length,
    UnitSelector,
  } = data;
  return (
    <>
      <RugModal
        role="Update"
        onSubmit={onUpdate}
        index={index + 1}
        isOpen={isRugModalDetailsOpened}
        onClose={onCloseReyugModalDetails}
        defaultValues={data}
      />
      <Flex
        gap="3"
        borderRadius="lg"
        bgColor="white"
        p="3"
        w="100%"
        pos="relative"
        alignItems="center"
        flexWrap="wrap"
      >
        <IconButton
          colorScheme="red"
          pos="absolute"
          top="1"
          right="1"
          onClick={onDelete}
        >
          <MdCancel />
        </IconButton>
        {RugCleaningOption?.RugImages.length >= 1 &&
          RugCleaningOption?.name !==
            "General (Deep Wash) Rug Cleaning Works ONLY" && (
            <Image
              borderRadius="lg"
              w="120px"
              h="120px"
              objectFit="cover"
              src={(() => {
                const Images = RugCleaningOption?.RugImages;
                return Images[0].value instanceof File
                  ? URL.createObjectURL(Images[0]?.value)
                  : Images[0]?.ImageDataURL
                  ? Images[0].ImageDataURL
                  : Images[0].value;
              })()}
            />
          )}
        <Stack w="100%" maxW="500px">
          <Text size="xs">Selected Option : {RugCleaningOption?.name}</Text>
          <Flex gap="3">
            <Text>
              width : {width} {UnitSelector}
            </Text>
            <Text>
              Length : {length} {UnitSelector}
            </Text>
          </Flex>

          <Button
            onClick={onOpenRugModalDetails}
            w="fit-content"
            variant="link"
            size="lg"
          >
            Click Here To see all order details
          </Button>
        </Stack>

        {/* <Stack gap="0">
        <Heading size="sm">Rug {index + 1}</Heading>
        <Text size="sm">
          Rug Width : {width} {UnitSelector}
        </Text>
        <Text size="sm">
          Rug length : {length} {UnitSelector}{" "}
        </Text>
        <Text size="sm">Rug Material : {RugMaterial} </Text>
        <Stack>
          <Text>Additional Services Selected :</Text>
          {AdditionalServices.map((value) => {
            return (
              <Box bgColor="gray.100" p="2" key={value.label}>
                {value.label}
              </Box>
            );
          })}
        </Stack>
      </Stack> */}
      </Flex>
    </>
  );
};
