import {
  Button,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useGetDoc } from "../../@Firebase/Hooks/Common/useGetDoc/useGetDoc";
import { useNavigate, useParams } from "react-router-dom";
import { useUserData } from "../../Context/UserDataProvider/UserDataPRovider";
import { CenteredTextWithLines } from "../../Components/Common/CenteredTextWithLines/CenteredTextWithLines";
import animationData from "../../Assets/FlowerAnimation/wired-flat-1845-rose-hover-pinch.json";
import { Order } from "../../@Firebase/Utils/Order/Order";
import Lottie from "lottie-react";
Date.prototype.toCustomDateString = function () {
  const year = this.getFullYear();
  const month = String(this.getMonth() + 1).padStart(2, "0");
  const day = String(this.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export default function Index() {
  const Navigate = useNavigate();
  const { id } = useParams();
  const { data, loading, error } = useGetDoc({
    __collection__: "Orders",
    docId: id,
  });
  const { user } = useUserData();
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const onConfirm = async () => {
    try {
      const order_init = new Order({
        status: "accepted",
      });
      await order_init.onUpdate(id, {
        isOrderCollectionDateConfirmed: true,
        isOrderReturningDateConfirmed: true,
      });
      toast({
        title: "Order Confirmed Successfully",
        description:
          "we will Collection The Order Accouring To The Confirmed Date",
        status: "success",
      });
      Navigate("/thanks-page");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Stack as={Skeleton} isLoaded={!loading} gap="5" alignItems="center" p="3">
      <Lottie
        animationData={animationData}
        style={{
          width: "100%",
          maxWidth: "150px",
        }}
      />
      <CenteredTextWithLines w="100%" maxWidth="400px" mb="22">
        <Text
          fontSize={{ base: "22px", sm: "26px" }}
          color="black"
          textAlign="center"
          flexShrink="0"
        >
          Dear {user.data?.firstName}
        </Text>
      </CenteredTextWithLines>
      <Text textAlign="center">
        We Want To Confirm That We Accepted Your Order And We Will Collection
        The Order as Following
      </Text>
      <CenteredTextWithLines w="100%" maxW="500px">
        <Heading size="md" fontWeight="600" flexShrink="0">
          Collection Date
        </Heading>
      </CenteredTextWithLines>
      <Flex gap="3">
        <Heading border="1px" p="3" size="md" fontWeight="600">
          {new Date(data?.collectionDate).toCustomDateString()}
        </Heading>
        <Heading border="1px" p="3" size="md" fontWeight="600">
          {data?.collectionTime}
        </Heading>
      </Flex>
      <CenteredTextWithLines w="100%" maxW="500px">
        <Heading size="md" fontWeight="600" flexShrink="0">
          Return Date
        </Heading>
      </CenteredTextWithLines>
      <Flex gap="3">
        <Heading border="1px" p="3" size="md" fontWeight="600">
          {new Date(data?.returnDate).toCustomDateString()}
        </Heading>
        <Heading border="1px" p="3" size="md" fontWeight="600">
          {data?.returnTime}
        </Heading>
      </Flex>
      <CenteredTextWithLines w="100%" maxW="500px">
        <Text flexShrink="0">Do You Want To Change Date ?</Text>
      </CenteredTextWithLines>
      <Button
        onClick={onConfirm}
        variant="outline"
        w="100%"
        maxW="350px"
        colorScheme="red"
      >
        Confirm
      </Button>
      <Button variant="outline" colorScheme="blackAlpha" color="black">
        Click Here If You Want To Change The Date
      </Button>
    </Stack>
  );
}
