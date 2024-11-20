import { Button, Flex, HStack, Skeleton, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { LazyLoadedImage } from "../../Components/Common/LazyLoadedImage/LazyLoadedImage";
import NoDataImage from "../../Assets/NoOrdersImage/image.webp";
import { useGetCollectionWithPaginationInCursors } from "../../@Firebase/Hooks/Common/useCollectionWithPagination(Cursors)/useCollectionWithPagination(Cursors)";
import { useUserData } from "../../Context/UserDataProvider/UserDataPRovider";
import { OrderBox } from "./Components/OrderBox/OrderBox";
export default function Index() {
  const orderStatusTypes = [
    { name: "completed orders", value: "completed" },
    { name: "requested orders", value: "pending" },
    { name: "In-Delivery orders", value: "accepted" },
  ];
  const [status, setStatus] = useState("pending");
  const { user } = useUserData();
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
    whereQueries: user.data
      ? [
          { field: "email", operator: "==", value: user.data?.email },
          {
            field: "status",
            operator: "==",
            value: status,
          },
        ]
      : [
          {
            field: "status",
            operator: "==",
            value: status,
          },
        ],
  });
  return (
    <Stack p="3" alignItems="center" minH="calc(100vh - 95px)">
      <Flex gap="3">
        {orderStatusTypes.map((statusType) => {
          return (
            <Button
              colorScheme="red"
              textTransform="capitalize"
              key={statusType.value}
              onClick={() => setStatus(statusType.value)}
              variant={statusType.value === status ? "outline" : "solid"}
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
