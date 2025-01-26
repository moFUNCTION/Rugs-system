import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
  Badge,
  Stack,
  Divider,
  useDisclosure,
  useMediaQuery,
  DrawerFooter,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Drawer,
  Avatar,
} from "@chakra-ui/react";
import {
  FaBars,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { BiChat, BiPencil } from "react-icons/bi";
import { MdFileOpen, MdNotifications, MdShop } from "react-icons/md";
import { LiaJediOrder, LiaStarSolid } from "react-icons/lia";
import { IoIosLogOut } from "react-icons/io";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useUserData } from "../../Context/UserDataProvider/UserDataPRovider";
import { CiShop } from "react-icons/ci";
import { useLogout } from "../../@Firebase/Hooks/Auth/useLogout/useLogout";
const CoverImage = () => {
  return (
    <Box
      w="100%"
      h={{ base: "200px", md: "280px" }}
      bgColor="gray.300"
      position="relative"
      borderRadius="lg"
    >
      <Button
        position="absolute"
        right={{ base: "2", md: "4" }}
        top={{ base: "2", md: "4" }}
        leftIcon={<BiPencil />}
        colorScheme="blue"
        variant="ghost"
        bg="white"
        size={{ base: "sm", md: "md" }}
        _hover={{ bg: "gray.100" }}
      >
        Edit Cover Image
      </Button>
    </Box>
  );
};

const ProfileImage = ({ src, name }) => {
  return (
    <Box position="relative">
      <Avatar
        name={name}
        src={src}
        alt="Profile"
        bgColor="gray.500"
        color="white"
        size="2xl"
        w={{ base: "150px", md: "195px" }}
        h={{ base: "150px", md: "195px" }}
        rounded="full"
        ImageProps={{
          objectFit: "cover",
        }}
      />
      <IconButton
        icon={<BiPencil />}
        position="absolute"
        bottom="4"
        right="4"
        rounded="full"
        size="sm"
        aria-label="Edit profile picture"
      />
    </Box>
  );
};

const SocialLinks = () => {
  const socialIcons = [
    { icon: FaFacebook, label: "Facebook" },
    { icon: FaInstagram, label: "Instagram" },
    { icon: FaTwitter, label: "Twitter" },
    { icon: FaYoutube, label: "YouTube" },
  ];

  return (
    <HStack spacing={{ base: "1", md: "2" }}>
      {socialIcons.map(({ icon: Icon, label }) => (
        <IconButton
          key={label}
          icon={<Icon />}
          variant="ghost"
          aria-label={label}
          size={{ base: "sm", md: "md" }}
        />
      ))}
    </HStack>
  );
};

const ProfileInfo = () => {
  const { user } = useUserData();
  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      alignItems="center"
      gap={{ base: "4", md: "6" }}
      pb="6"
    >
      <ProfileImage name={user.data?.username} src={user.data?.photoURL} />

      <Flex
        flex="1"
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "flex-end" }}
        justify="space-between"
        gap={{ base: "4", md: "6" }}
        w="full"
      >
        <VStack align={{ base: "center", md: "flex-start" }} spacing="2">
          <Flex
            align="center"
            gap="2"
            direction={{ base: "column", md: "row" }}
          >
            <Box>
              <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="bold"
                textAlign={{ base: "center", md: "left" }}
              >
                {user.data?.firstName + " " + user.data?.lastName}
              </Text>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                textAlign={{ base: "center", md: "left" }}
              >
                {user.data?.email}
              </Text>
            </Box>

            <Button ml="2">Client</Button>
          </Flex>
        </VStack>

        <Flex
          gap={{ base: "3", md: "4" }}
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "center" }}
          w={{ base: "full", md: "auto" }}
        >
          <SocialLinks />
        </Flex>
      </Flex>
    </Flex>
  );
};
const TabsLinks = [
  {
    title: "Requested Orders",
    Icon: CiShop,
    href: "orders",
  },
  // {
  //   title: "Chat With Us",
  //   Icon: BiChat,
  //   href: "chat",
  // },
  {
    title: "Invoices",
    Icon: MdFileOpen,
    href: "invoices",
  },
  {
    title: "Receipts",
    Icon: MdFileOpen,
    href: "receipts",
  },
];
const TabsMenu = () => {
  const { pathname } = useLocation();
  const [route] = pathname.split("/").slice(-1);
  const { loading, error, onLogout } = useLogout();
  return (
    <Stack w="100%" maxW="300px">
      {TabsLinks.map((link) => {
        const { Icon, title, href } = link;
        return (
          <>
            <Button
              as={Link}
              to={href}
              variant={route === href ? "solid" : "ghost"}
              gap="3"
              justifyContent="start"
              key={title}
              size="lg"
              w="100%"
            >
              <Icon />
              {title}
            </Button>
            <Divider />
          </>
        );
      })}
      <Button
        colorScheme="red"
        gap="3"
        justifyContent="start"
        size="lg"
        w="100%"
        variant="outline"
        onClick={onLogout}
        isLoading={loading}
      >
        <IoIosLogOut />
        Logout
      </Button>
    </Stack>
  );
};
export default function Index() {
  const [isPhoneQuery] = useMediaQuery("(max-width: 1200px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();
  useEffect(() => {
    onClose();
  }, [pathname]);
  return (
    <Stack p="4" alignItems="center">
      <Container maxW="container.xl">
        <ProfileInfo />
      </Container>
      <Flex alignItems="start" gap="4" w="100%" maxW="container.xl">
        {isPhoneQuery ? (
          <Drawer size="md" isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>

              <DrawerBody>
                <TabsMenu />
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ) : (
          <TabsMenu />
        )}
        <Stack w="100%" h="100%">
          {isPhoneQuery && (
            <IconButton onClick={onOpen} mr="auto" ml="4" mb="2">
              <FaBars />
            </IconButton>
          )}

          <Outlet
            context={{
              isOpen,
              onOpen,
              onClose,
            }}
          />
        </Stack>
      </Flex>
    </Stack>
  );
}
