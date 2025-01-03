import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Icon,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

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
                  fontSize={["xs", "sm"]}
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
  const locations = [
    {
      region: "LONDON CENTRAL",
      address: [
        "65 Sloane Street",
        "Knightsbridge",
        "London SW1X 9SH",
        "T: 0203 740 6642",
      ],
    },
    {
      region: "OXFORD",
      address: [
        "Clarendon House",
        "52 Cornmarket Street",
        "Oxford OX1 3HJ",
        "T: 0186 598 5779",
      ],
    },
    {
      region: "SURREY",
      address: [
        "St. Martin's House",
        "Ockham Road South",
        "Surrey KT24 6RX",
        "T: 020 8800 3377",
      ],
    },
    {
      region: "NORTH LONDON",
      address: [
        "Building A, OCC",
        "102 Vale Road",
        "London N4 1FL",
        "T: 0208 800 3377",
      ],
    },
  ];

  const socialLinks = [
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/MagicHandLtd/",
      title: "Follow on Facebook",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/magichandltd/",
      title: "Follow on Instagram",
    },
    {
      icon: FaYoutube,
      href: "https://www.youtube.com/channel/UCgR8T356ZF4xQAaNiVUqvJQ",
      title: "Follow on Youtube",
    },
  ];

  return (
    <Box
      display="flex"
      backgroundColor="logoheaderbg"
      borderTopWidth="1px"
      borderTopColor="borderbo"
      py={[4, 6]} // Added vertical padding
    >
      <Box width="full" px={[4, 50]}>
        <Grid
          gap={[6, 10]}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          fontFamily="Arial, Helvetica, Arial, Lucida, sans-serif"
          lineHeight="1.6em"
        >
          {locations.map((location, index) => (
            <GridItem key={index} textAlign="start">
              <Text color="red.700" fontSize="lg" fontWeight="bold" mb={2}>
                {location.region}
              </Text>
              {location.address.map((line, lineIndex) => (
                <Text key={lineIndex} color="bordertop" fontSize="fzmn" mb={1}>
                  {line}
                </Text>
              ))}
            </GridItem>
          ))}

          <GridItem textAlign="start">
            <Text color="fred" fontWeight="bold" mb={2}>
              MAGIC HAND LTD
            </Text>
            <Text color="bordertop" fontSize="fzmn" mb={1}>
              FREE Collection & Delivery
            </Text>
            <Text color="bordertop" fontSize="fzmn" mb={1}>
              OPEN 7 days
            </Text>
            <Text color="bordertop" fontSize="fzmn" mb={2}>
              EMAIL{" "}
              <Text as="span" color="fred">
                rugs@magichand.co.uk
              </Text>
            </Text>

            <HStack spacing={3} mt={2}>
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  isExternal
                  title={social.title}
                >
                  <Icon
                    as={social.icon}
                    w={6}
                    h={6}
                    color="gray.500"
                    _hover={{ color: "gray.700" }}
                  />
                </Link>
              ))}
            </HStack>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}

function FooterRights() {
  return (
    <Box
      display="flex"
      backgroundColor="borderbo"
      py={3} // Replaced fixed height with padding
    >
      <Box width="full" px={[4, 50]}>
        <Text color="slate.100" fontSize="11px">
          © 2021 Magic Hand Ltd. All rights reserved
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
