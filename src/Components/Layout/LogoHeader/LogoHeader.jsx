import React from "react";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import logo from "../../../Assets/Logo/MH-Logo-8847d87f.png";

export const LogoHeader = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="219.81px"
      backgroundColor="logoheaderbg"
      paddingTop="14px"
      paddingBottom="25px"
      bgColor="rgb(242 ,242, 242)"
    >
      <Box display="flex" justifyContent="center" marginBottom="25px">
        <Image
          src={logo}
          alt="Logo"
          width="193.7px"
          height="121.81px"
          objectFit="contain"
        />
      </Box>
      <VStack justifyContent="center" paddingX="44px">
        <Text
          color="#a17309"
          fontFamily="mgichand"
          letterSpacing="wide"
          textAlign="center"
          fontSize={["16px", "20px"]}
        >
          The Premier Rug and Oriental Carpet Cleaning, Repairs and Restoration
          Company
        </Text>
      </VStack>
    </Box>
  );
};
