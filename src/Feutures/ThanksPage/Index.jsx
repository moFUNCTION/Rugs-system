import { Box, Stack, Text } from "@chakra-ui/react";
import { useUserData } from "../../Context/UserDataProvider/UserDataPRovider";
import Lottie from "lottie-react";
import animationData from "../../Assets/FlowerAnimation/wired-flat-1845-rose-hover-pinch.json";
import { CenteredTextWithLines } from "../../Components/Common/CenteredTextWithLines/CenteredTextWithLines";
export default function Index() {
  const { user } = useUserData();
  return (
    <Stack
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      pt="14px"
      pb="25px"
      px="2"
    >
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

      <Text
        fontSize={{ base: "14px", sm: "18px" }}
        textAlign="center"
        color="inherit"
        mb="6px"
      >
        Thank you for submitting your rug works and services request.
      </Text>
      <Text
        fontSize={{ base: "14px", sm: "18px" }}
        textAlign="center"
        color="inherit"
      >
        You will receive a Rug Works and Services Estimate by email shortly.
      </Text>
    </Stack>
  );
}
