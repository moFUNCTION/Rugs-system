import { Badge, Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useCollectionCount } from "../../../../@Firebase/Hooks/Common/useCollectionCount/useCollectionCount";
import { CenteredTextWithLines } from "../../../../Components/Common/CenteredTextWithLines/CenteredTextWithLines";
import { calculateTimeDifference } from "../../../../Utils/GetDateByTimeStamp/GetDateByTimeStamp";
import { Link } from "react-router-dom";

export const OrderBox = ({
  RugCollectionAddress,
  RugCollectionAddressPostCode,
  email,
  phoneNumber,
  status,
  username,
  createdAt,
  id,
  RugReturnAddressPostCode,
  RugReturnAddress,
}) => {
  const { count } = useCollectionCount({
    __collection__: `Orders/${id}/RugsUploaded`,
  });
  return (
    <Stack
      boxShadow="md"
      borderRadius="lg"
      w="100%"
      maxW="lg"
      p="3"
      bgColor="white"
      alignItems="center"
    >
      <CenteredTextWithLines>
        <Text flexShrink="0">Order Data</Text>
      </CenteredTextWithLines>
      <Badge>Status : {status}</Badge>
      <Text>Created At : {calculateTimeDifference(createdAt)}</Text>
      <Text>Rugs Count : {count}</Text>
      <Text>RugCollectionAddress : {RugCollectionAddress}</Text>
      <Text>RugCollectionAddressPostCode : {RugCollectionAddressPostCode}</Text>
      {RugReturnAddress && RugCollectionAddressPostCode ? (
        <>
          <Text>RugReturnAddress : {RugReturnAddress}</Text>
          <Text>RugReturnAddressPostCode : {RugReturnAddressPostCode}</Text>
        </>
      ) : (
        <CenteredTextWithLines>
          <Text flexShrink="0">The Rug Return Address is the Same</Text>
        </CenteredTextWithLines>
      )}
      <HStack my="3">
        <Button as={Link} to={id} colorScheme="blackAlpha" variant="outline">
          Watch the Complete Order
        </Button>
        <Button as={Link} to={id} colorScheme="green" variant="outline">
          Update The Order
        </Button>
      </HStack>
    </Stack>
  );
};
