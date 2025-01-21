import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Button,
  Stack,
  Skeleton,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Badge,
} from "@chakra-ui/react";
import { MdArrowRight, MdSearch } from "react-icons/md";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useGetCollectionWithPaginationInCursors } from "../../../@Firebase/Hooks/Common/useCollectionWithPagination(Cursors)/useCollectionWithPagination(Cursors)";
import { CenteredTextWithLines } from "../../../Components/Common/CenteredTextWithLines/CenteredTextWithLines";
import { useUserData } from "../../../Context/UserDataProvider/UserDataPRovider";
import { GetDateByTimeStamp } from "../../../Utils/GetDateByTimeStamp/GetDateByTimeStamp";
import { useNavigate } from "react-router-dom";
export default function Index() {
  const Navigate = useNavigate();
  const { user } = useUserData();

  const {
    loading,
    data,
    error,
    HandleGetNextPage,
    HandleGetPreviousPage,
    isDisabledNext,
    isDisabledPrev,
    count,
    HandleRender,
  } = useGetCollectionWithPaginationInCursors({
    size: 10,
    __collection__: "Orders",
    whereQueries: [
      {
        field: "email",
        operator: "==",
        value: user.data.email,
      },
      {
        field: "status",
        operator: "==",
        value: "order",
      },
    ],
  });

  return (
    <Stack
      sx={{
        "> *": {
          flexShrink: "0",
        },
      }}
      h="100%"
      p="3"
      w="100%"
    >
      <CenteredTextWithLines TextAlign="left" p="3" size="md">
        <Heading h="auto" flexShrink="0" size="md">
          Receipts
        </Heading>
      </CenteredTextWithLines>

      <TableContainer
        as={Skeleton}
        minH="400px"
        isLoaded={!loading}
        overflow="auto"
        w="100%"
      >
        <Table size="lg">
          <Thead w="100%">
            <Tr>
              <Th>Receipt No</Th>
              <Th>Customer name</Th>
              <Th>email</Th>
              <Th>phoneNumber</Th>
              <Th>Ordered At</Th>
              <Th>Total Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((OrderData, index) => {
              console.log(OrderData);
              return (
                <Tr
                  _hover={{
                    bgColor: "gray.100",
                  }}
                  key={OrderData.id}
                  onClick={() =>
                    Navigate(`/orders/${OrderData.id}/invoice-pdf`)
                  }
                >
                  <Th>{OrderData.receiptNo}</Th>
                  <Th>{OrderData.username}</Th>
                  <Th>{OrderData.email}</Th>
                  <Th>{OrderData.phoneNumber}</Th>
                  <Th>
                    {
                      GetDateByTimeStamp({
                        dateProvided: OrderData.createdAt,
                      }).TimeDifferenceDate
                    }
                  </Th>
                  <Th>{OrderData.totalPrice + "£" || "Not Set Yet"}</Th>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justifyContent="end" gap="3" p="3" bgColor="gray.100">
        <Button
          alignItems="center"
          gap="3"
          colorScheme="blackAlpha"
          variant="outline"
          bgColor="white"
          isDisabled={isDisabledPrev}
          onClick={HandleGetPreviousPage}
        >
          <BsArrowLeft />
          Prev
        </Button>
        <Button
          alignItems="center"
          gap="3"
          colorScheme="blackAlpha"
          variant="outline"
          bgColor="white"
          isDisabled={isDisabledNext}
          onClick={HandleGetNextPage}
        >
          Next
          <BsArrowRight />
        </Button>
      </Flex>
    </Stack>
  );
}
