import React, { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  VStack,
  Text,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { BsYoutube, BsInstagram } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Logo } from "../../Common/Logo/Logo";
import { useUserData } from "../../../Context/UserDataProvider/UserDataPRovider";
import { useLogout } from "../../../@Firebase/Hooks/Auth/useLogout/useLogout";
export const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { user } = useUserData();
  const { onLogout } = useLogout();
  return (
    <Box
      as="header"
      w="full"
      borderBottom="1px"
      borderColor="gray.200"
      bg="white"
      shadow="sm"
      zIndex="sticky"
      position="relative"
    >
      <Flex
        pos="relative"
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        px={{ base: "4", md: "8" }}
        py="3"
        gap="10"
        flexWrap="wrap"
      >
        {/* Logo */}
        <Logo w="120px" />

        {/* Mobile Menu Toggle */}
        <Box display={{ base: "block", lg: "none" }}>
          <IconButton
            icon={isOpen ? <IoCloseOutline /> : <RxHamburgerMenu />}
            onClick={onToggle}
            aria-label="Toggle Navigation"
            variant="ghost"
            size="lg"
          />
        </Box>

        {/* Desktop Info */}
        <HStack
          display={{ base: "none", lg: "flex" }}
          flex="1"
          justify="center"
          spacing="6"
        >
          <Text fontWeight="medium" color="gray.700">
            OPEN 7 DAYS
          </Text>
          <Text>
            <Text as="span" color="red.500">
              LONDON{" "}
            </Text>
            020 8800 3377
          </Text>
          <Text>
            <Text as="span" color="red.500">
              OXFORD{" "}
            </Text>
            0186 598 5779
          </Text>
          <Text>
            <Text as="span" color="red.500">
              SURREY{" "}
            </Text>
            020 8800 3377
          </Text>
          <Text>
            <Text as="span" color="red.500">
              EMAIL{" "}
            </Text>
            <Link href="mailto:rugs@magichand.co.uk" color="blue.500">
              rugs@magichand.co.uk
            </Link>
          </Text>
          <Text fontWeight="medium" color="gray.700">
            FREE COLLECTION & DELIVERY
          </Text>
        </HStack>

        {/* User & Social Icons */}
        <HStack spacing="4" align="center">
          {/* Social Icons */}
          <HStack spacing="2">
            <Link
              href="https://www.facebook.com/MagicHandLtd/"
              title="Follow on Facebook"
              target="_blank"
            >
              <FaFacebookF size="20" />
            </Link>
            <Link
              href="https://www.instagram.com/magichandltd/"
              title="Follow on Instagram"
              target="_blank"
            >
              <BsInstagram size="20" />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCgR8T356ZF4xQAaNiVUqvJQ"
              title="Follow on Youtube"
              target="_blank"
            >
              <BsYoutube size="20" />
            </Link>
          </HStack>

          {/* User Account */}
          <Menu>
            <Avatar
              as={MenuButton}
              src={user?.data?.photoURL}
              name={user?.data?.username[0]}
              size="sm"
              cursor="pointer"
            />
            <MenuList>
              {user.data ? (
                <>
                  <MenuItem as={Link} to="/user">
                    Profile
                  </MenuItem>
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                  <MenuItem as={Link} to="/orders">
                    Orders
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem as={Link} to="/login">
                    Login
                  </MenuItem>
                  <MenuItem as={Link} to="/register">
                    Register
                  </MenuItem>
                </>
              )}
              <MenuItem as={Link} href="https://www.facebook.com/MagicHandLtd/">
                Chat With Us
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Mobile Sidebar */}
      {isOpen && (
        <VStack
          pos="absolute"
          top="100%"
          w="full"
          bg="white"
          border="1px"
          borderColor="gray.200"
          p="4"
          spacing="4"
          shadow="md"
          rounded="md"
          zIndex="10"
        >
          <Text fontWeight="medium" color="gray.700">
            OPEN 7 DAYS
          </Text>
          <Text>
            <Text as="span" color="red.500">
              LONDON{" "}
            </Text>
            020 8800 3377
          </Text>
          <Text>
            <Text as="span" color="red.500">
              OXFORD{" "}
            </Text>
            0186 598 5779
          </Text>
          <Text>
            <Text as="span" color="red.500">
              SURREY{" "}
            </Text>
            020 8800 3377
          </Text>
          <Text>
            <Text as="span" color="red.500">
              EMAIL{" "}
            </Text>
            <Link href="mailto:rugs@magichand.co.uk" color="blue.500">
              rugs@magichand.co.uk
            </Link>
          </Text>
          <Text fontWeight="medium" color="gray.700">
            FREE COLLECTION & DELIVERY
          </Text>
        </VStack>
      )}
    </Box>
  );
};
