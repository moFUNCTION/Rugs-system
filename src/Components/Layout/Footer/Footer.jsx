import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Icon,
  HStack,
  Stack,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";

function FooterPolicy() {
  const policyLinks = [
    {
      to: "https://magichand.co.uk/terms-and-conditions/",
      text: "Terms and Conditions",
    },
    {
      to: "https://magichand.co.uk/privacy-and-cookies-policy/",
      text: "Privacy and Cookies Policy",
    },
    {
      to: "https://magichand.co.uk/payments-and-refunds/",
      text: "Payments and Refunds Policy",
    },
    {
      to: "https://magichand.co.uk/data-protection/",
      text: "Data Protection",
    },
  ];

  return (
    <Box
      backgroundColor="footerpbg"
      py={[2, 3]} // Added vertical padding
      display="flex"
      alignItems="center"
      bgColor="#cccccc"
    >
      <Box width="full" px={[4, 50]}>
        <Grid
          templateColumns={["repeat(2, 1fr)", "repeat(4, 1fr)"]}
          gap={[4, 7]}
          justifyContent="center"
          alignItems="center"
        >
          {policyLinks.map((link, index) => (
            <GridItem key={index} display="flex" justifyContent="center">
              <Link
                to={link.to}
                isExternal
                width={["full", "auto"]}
                _hover={{ textDecoration: "underline" }}
              >
                <Text
                  color="footerptcolor"
                  fontSize={["xs", "xs"]}
                  textAlign="center"
                >
                  {link.text}
                </Text>
              </Link>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

function FooterAddresses() {
  return (
    <Box
      bg="#f8f9fa"
      borderTop="1px"
      borderColor="gray.300"
      h="auto"
      py={5}
      bgColor="#f2f2f2"
      mt={50}
    >
      <Flex
        w="full"
        px={{ base: 4, md: 12, xl: 50 }}
        pb={4}
        direction="column"
        align="center"
      >
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
            xl: "repeat(5, 1fr)",
          }}
          gap={{ base: 6, md: 10, xl: 20 }}
          mt={5}
          maxW="1200px"
          mx="auto"
          fontFamily="Arial, Helvetica, sans-serif"
          lineHeight="1.6em"
        >
          {/* London Central */}
          <Box textAlign="start" w="175px">
            <Text color="red.600" fontSize="md">
              LONDON CENTRAL
            </Text>
            <Text fontSize="sm" color="gray.700">
              45 Pont Street
            </Text>
            <Text fontSize="sm" color="gray.700">
              Knightsbridge
            </Text>
            <Text fontSize="sm" color="gray.700">
              London SW1X 0BD
            </Text>
            <Text fontSize="sm" color="gray.700">
              T: 0203 740 6642
            </Text>
          </Box>

          {/* Oxford */}
          <Box textAlign="start">
            <Text color="red.600" fontSize="md">
              OXFORD
            </Text>
            <Text fontSize="sm" color="gray.700">
              Clarendon House
            </Text>
            <Text fontSize="sm" color="gray.700">
              52 Cornmarket Street
            </Text>
            <Text fontSize="sm" color="gray.700">
              Oxford OX1 3HJ
            </Text>
            <Text fontSize="sm" color="gray.700">
              T: 0186 598 5779
            </Text>
          </Box>

          {/* Surrey */}
          <Box textAlign="start">
            <Text color="red.600" fontSize="md">
              SURREY
            </Text>
            <Text fontSize="sm" color="gray.700">
              St. Martin's House
            </Text>
            <Text fontSize="sm" color="gray.700">
              Ockham Road South
            </Text>
            <Text fontSize="sm" color="gray.700">
              Surrey KT24 6RX
            </Text>
            <Text fontSize="sm" color="gray.700">
              T: 020 8800 3377
            </Text>
          </Box>

          {/* North London */}
          <Box textAlign="start" w="150px">
            <Text color="red.600" fontSize="md">
              NORTH LONDON
            </Text>
            <Text fontSize="sm" color="gray.700">
              Building A, OCC
            </Text>
            <Text fontSize="sm" color="gray.700">
              102 Vale Road
            </Text>
            <Text fontSize="sm" color="gray.700">
              London N4 1FL
            </Text>
            <Text fontSize="sm" color="gray.700">
              T: 0208 800 3377
            </Text>
          </Box>

          {/* Magic Hand Ltd */}
          <Box textAlign="start">
            <Text color="red.600" fontSize="md">
              MAGIC HAND LTD
            </Text>
            <Text fontSize="sm" color="gray.700">
              FREE Collection & Delivery
            </Text>
            <Text fontSize="sm" color="gray.700">
              OPEN 7 days
            </Text>
            <Text fontSize="sm" color="gray.700">
              EMAIL{" "}
              <Text as="span" color="red.600">
                rugs@magichand.co.uk
              </Text>
            </Text>

            <HStack mt="4" spacing={3}>
              <Link
                href="https://www.facebook.com/MagicHandLtd/"
                title="Follow on Facebook"
                isExternal
                ml={8}
              >
                <IconButton variant="outline">
                  <FaFacebookF />
                </IconButton>
              </Link>
              <Link
                href="https://www.instagram.com/magichandltd/"
                title="Follow on Instagram"
                isExternal
              >
                <IconButton variant="outline">
                  <FaInstagram />
                </IconButton>
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCgR8T356ZF4xQAaNiVUqvJQ"
                title="Follow on Youtube"
                isExternal
              >
                <IconButton variant="outline">
                  <FaYoutube />
                </IconButton>
              </Link>
            </HStack>
          </Box>
        </Grid>
      </Flex>
    </Box>
  );
}

function FooterRights() {
  return (
    <Box
      display="flex"
      backgroundColor="borderbo"
      py={3} // Replaced fixed height with padding
      bgColor="#b5b5b5"
    >
      <Box width="full" px={[4, 50]}>
        <Text color="white" fontSize="11px">
          © 2025 Magic Hand Ltd. All rights reserved
        </Text>
      </Box>
    </Box>
  );
}

export const Footer = () => {
  return (
    <Stack spacing={0} p={0}>
      {" "}
      {/* Remove default spacing */}
      <FooterAddresses />
      <FooterPolicy />
      <FooterRights />
    </Stack>
  );
};
