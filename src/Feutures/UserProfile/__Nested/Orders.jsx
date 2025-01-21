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
    ],
  });

  const statusWrapper = {
    request: "not reviewed by admin yet",
    qutation: "please click here to confirm the order !!",
    order: "click here to see collection time",
    "confirm-order": "order recieved but not confirmed by admin yet",
    invoice: "click here to see invoice",
    finished: "Order has Finsihed",
  };
  const NavigateTo = ({ orderId, status }) => {
    console.log(status);
    const statusWrapper = {
      request: () => Navigate(`/orders/${orderId}`),
      qutation: () => Navigate(`/orders/${orderId}/client-submition`),
      order: () => Navigate(`/orders/${orderId}/time`),
      "confirm-order": () => {
        return;
      },
      invoice: () => Navigate(`/orders/${orderId}/invoice-pdf`),
      finished: "Order has Finsihed",
    };
    statusWrapper[status]();
  };

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
          Orders
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
              <Th>Id</Th>
              <Th>Customer name</Th>
              <Th>email</Th>
              <Th>phoneNumber</Th>
              <Th>Status</Th>
              <Th>Ordered At</Th>
              <Th>Total Price</Th>
              <Th>Is Paid</Th>
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
                    NavigateTo({
                      status: OrderData.status,
                      orderId: OrderData.id,
                    })
                  }
                >
                  <Th>{count.count - index}</Th>
                  <Th>{OrderData.username}</Th>
                  <Th>{OrderData.email}</Th>
                  <Th>{OrderData.phoneNumber}</Th>
                  <Th>{statusWrapper[OrderData.status]}</Th>
                  <Th>
                    {
                      GetDateByTimeStamp({
                        dateProvided: OrderData.createdAt,
                      }).TimeDifferenceDate
                    }
                  </Th>
                  <Th>{OrderData.totalPrice + "£" || "Not Set Yet"}</Th>
                  <Th>
                    <Badge colorScheme={OrderData.isPaid ? "green" : "red"}>
                      {OrderData.isPaid ? "Yes" : "No"}
                    </Badge>
                  </Th>
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
