import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  useDisclosure,
  VStack,
  HStack,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { FaFacebookF, FaInstagram, FaUser, FaYoutube } from "react-icons/fa";
import { useUserData } from "../../../Context/UserDataProvider/UserDataPRovider";
import { Link } from "react-router-dom";
export const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { user } = useUserData();
  return (
    <Stack
      justifyContent="center"
      p="3"
      w="full"
      borderBottom="1px"
      borderColor="gray.200"
      fontSize="sm"
    >
      <Flex
        justify="space-between"
        alignItems="center"
        maxW={{ base: "100%", "2xl": "82%" }}
        mx="auto"
        px="15px"
        gap="10"
      >
        {/* Mobile Menu Toggle */}
        <Flex
          display={{
            base: "flex",
            md: "none",
          }}
          alignItems="center"
        >
          <IconButton
            aria-label="Toggle Menu"
            icon={
              isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="28px"
                  height="28px"
                >
                  <path
                    d="M289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="28px"
                  height="28px"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 6h16" />
                    <path d="M4 12h16" />
                    <path d="M4 18h16" />
                  </g>
                </svg>
              )
            }
            onClick={onToggle}
            variant="ghost"
          />

          {isOpen && (
            <VStack
              p={6}
              bg="white"
              border="1px"
              borderColor="gray.200"
              position="absolute"
              top="70px"
              left={0}
              mx={1}
              my={2}
              minW="140px"
              rounded="xl"
              zIndex={40}
              align="start"
            >
              <Text fontSize="16px" fontWeight="medium" color="gray.500">
                OPEN 7 DAYS
              </Text>
              <Text fontSize="14px" mt={5} color="gray.500">
                <Text as="span" color="red.600" ml="1">
                  LONDON{" "}
                </Text>
                020 8800 3377
              </Text>
              <Text fontSize="14px" mt={5} color="gray.500">
                <Text as="span" color="red.600" ml="1">
                  OXFORD{" "}
                </Text>
                0186 598 5779
              </Text>
              <Text fontSize="14px" mt={5} color="gray.500">
                <Text as="span" color="red.600" ml="1">
                  SURREY{" "}
                </Text>
                020 8800 3377
              </Text>
              <Text fontSize="14px" mt={5} color="gray.500">
                <Text as="span" color="red.600" ml="1">
                  EMAIL{" "}
                </Text>
                <Link href="mailto:rugs@magichand.co.uk">
                  rugs@magichand.co.uk
                </Link>
              </Text>
              <Text fontSize="14px" mt={5} color="gray.500">
                FREE COLLECTION & DELIVERY
              </Text>
            </VStack>
          )}
        </Flex>

        {/* Desktop Menu */}
        <Box
          display={{ base: "none", lg: "block" }}
          flex="1"
          textAlign="center"
          ml={{ xl: "30px" }}
        >
          <HStack spacing={{ base: 3, lg: 5, xl: 9, "2xl": 10 }}>
            <Text fontSize="18px">
              <Text as="span" fontSize="md">
                OPEN 7 DAYS
              </Text>
            </Text>
            <Text>
              <Text as="span" color="red.600" ml="1">
                LONDON{" "}
              </Text>
              020 8800 3377
            </Text>
            <Text>
              <Text as="span" color="red.600" ml="1">
                OXFORD{" "}
              </Text>
              0186 598 5779
            </Text>
            <Text>
              <Text as="span" color="red.600" ml="1">
                SURREY{" "}
              </Text>
              020 8800 3377
            </Text>
            <Text>
              <Text as="span" color="red.600" ml="1">
                EMAIL{" "}
              </Text>
              <a href="mailto:rugs@magichand.co.uk" color="black">
                rugs@magichand.co.uk
              </a>
            </Text>
            <Text fontSize="md">FREE COLLECTION & DELIVERY</Text>
          </HStack>
        </Box>

        {/* Social Icons */}
        <Box>
          <HStack spacing={3}>
            <a
              href="https://www.facebook.com/MagicHandLtd/"
              title="Follow on Facebook"
            >
              <IconButton variant="outline">
                <FaFacebookF />
              </IconButton>
            </a>
            <a
              href="https://www.instagram.com/magichandltd/"
              title="Follow on Instagram"
            >
              <IconButton variant="outline">
                <FaInstagram />
              </IconButton>
            </a>
            <a
              href="https://www.youtube.com/channel/UCgR8T356ZF4xQAaNiVUqvJQ"
              title="Follow on Youtube"
            >
              <IconButton variant="outline">
                <FaYoutube />
              </IconButton>
            </a>
            <IconButton as={Link} to="/user" variant="outline">
              <FaUser />
            </IconButton>
          </HStack>
        </Box>
      </Flex>
    </Stack>
  );
};
