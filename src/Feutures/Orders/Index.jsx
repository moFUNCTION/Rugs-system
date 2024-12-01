import { Button, Flex, HStack, Skeleton, Stack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { LazyLoadedImage } from "../../Components/Common/LazyLoadedImage/LazyLoadedImage";
import NoDataImage from "../../Assets/NoOrdersImage/image.webp";
import { useGetCollectionWithPaginationInCursors } from "../../@Firebase/Hooks/Common/useCollectionWithPagination(Cursors)/useCollectionWithPagination(Cursors)";
import { useUserData } from "../../Context/UserDataProvider/UserDataPRovider";
import { OrderBox } from "./Components/OrderBox/OrderBox";
export default function Index() {
  const orderStatusTypes = [
    { name: "completed orders", value: "completed" },
    { name: "requested orders", value: "pending" },
    {
      name: "Waiting For Your approval",
      value: "accepted-waiting-client",
      query: [
        {
          field: "isAcceptedByClient",
          operator: "==",
          value: false,
          isBoolean: true,
        },
      ],
    },
    {
      name: "Submited Successfully But Under Preview",
      value: "accepted-waiting-admin",
      query: [
        {
          field: "isAcceptedByClient",
          operator: "==",
          value: true,
          isBoolean: true,
        },
        // {
        //   field: "isClientApprovalReviewed",
        //   operator: "==",
        //   value: false,
        //   isBoolean: true,
        // },
      ],
    },
    {
      name: "In-Delivery orders",
      value: "accepted",
      query: [
        {
          field: "isAcceptedByClient",
          operator: "==",
          value: true,
        },
        {
          field: "isClientApprovalReviewed",
          operator: "==",
          value: true,
        },
      ],
    },
  ];
  const [status, setStatus] = useState("accepted-waiting-client");
  const { user } = useUserData();
  const Queries = () => {
    const statusSelected = status.split("-");
    const arr = [
      {
        field: "status",
        operator: "==",
        value: statusSelected[0],
      },
      { field: "email", operator: "==", value: user.data?.email },
    ];
    const QuerySelected = orderStatusTypes.find((orderStatus) => {
      return orderStatus.value === statusSelected.join("-");
    })?.query;
    if (QuerySelected) {
      arr.push(...QuerySelected);
    }

    return arr;
  };

  const {
    data,
    error,
    loading,
    HandleGetNextPage,
    HandleGetPreviousPage,
    isDisabledNext,
    isDisabledPrev,
  } = useGetCollectionWithPaginationInCursors({
    size: 6,
    __collection__: "Orders",
    whereQueries: Queries(),
    orderByQueries: [],
  });

  return (
    <Stack p="3" alignItems="center">
      <Flex
        justifyContent="center"
        p="3"
        className="scroll-x"
        w="100%"
        overflow="auto"
        gap="3"
      >
        {orderStatusTypes.map((statusType) => {
          return (
            <Button
              flexShrink="0"
              colorScheme="red"
              textTransform="capitalize"
              key={statusType.value + statusType.name}
              onClick={() => setStatus(statusType.value)}
              variant={statusType.value === status ? "outline" : "solid"}
              borderRadius="full"
            >
              {statusType.name}
            </Button>
          );
        })}
      </Flex>
      <Flex
        alignItems="center"
        w="100%"
        minH="400px"
        justifyContent="center"
        as={Skeleton}
        isLoaded={!loading}
        bgColor="gray.100"
        p="3"
        flexWrap="wrap"
        gap="5"
      >
        {data.length === 0 && (
          <LazyLoadedImage
            w="100%"
            maxW="400px"
            src={NoDataImage}
            borderRadius="lg"
          />
        )}
        {data?.map((order) => {
          return <OrderBox key={order.id} {...order} />;
        })}
      </Flex>
      <HStack>
        <Button
          isDisabled={isDisabledPrev}
          onClick={HandleGetPreviousPage}
          colorScheme="blackAlpha"
          variant="outline"
        >
          Prev
        </Button>
        <Button
          isDisabled={isDisabledNext}
          onClick={HandleGetNextPage}
          colorScheme="blackAlpha"
          variant="outline"
        >
          Next
        </Button>
      </HStack>
    </Stack>
  );
}
