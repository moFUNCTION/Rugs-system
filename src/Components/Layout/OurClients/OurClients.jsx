import { Box, Text, Flex, Image } from "@chakra-ui/react";
import Clients from "../../../Assets/Clients/logos.png";
import { LazyLoadedImage } from "../../Common/LazyLoadedImage/LazyLoadedImage";
export const OurClients = () => {
  return (
    <Box minH="265px" p="3" bg="#faf4f2">
      <Flex justify="center" px="50px" pb="17px">
        <Box pt="20px" w="auto">
          <Text fontSize="fzrug" color="bordertop">
            ALL OUR RUG SERVICES COME HIGHLY RECOMMENDED BY...
          </Text>
        </Box>
      </Flex>

      <Box h="202px" px="50px" pb="17px">
        <Flex justify="center" pt="2px">
          <LazyLoadedImage w="100%" src={Clients} alt="Logo" />
        </Flex>
      </Box>
    </Box>
  );
};
