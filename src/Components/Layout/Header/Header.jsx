import {
  Avatar,
  Button,
  Flex,
  HStack,
  IconButton,
  Skeleton,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { Logo } from "../../Common/Logo/Logo";
import { Link } from "react-router-dom";
import { useUserData } from "../../../Context/UserDataProvider/UserDataPRovider";
import { UserAvatar } from "../../Common/UserAvatar/UserAvatar";
export const Header = () => {
  const [isPhoneQuery] = useMediaQuery("(max-width: 965px)");
  const { user } = useUserData();
  return (
    <Flex
      alignItems="center"
      justifyContent={isPhoneQuery ? "center" : "space-between"}
      p="4"
      gap="7"
      flexWrap="wrap"
    >
      <Logo w="100px" />

      <HStack
        wrap="wrap"
        justifyContent="center"
        order={isPhoneQuery && 3}
        gap="3"
      >
        {["orders", "Blog", "Chat-With-Us"].map((child) => {
          return (
            <Button
              textTransform="capitalize"
              as={Link}
              to={child}
              size="lg"
              variant="link"
              key={child}
            >
              {child}
            </Button>
          );
        })}
      </HStack>

      <HStack as={Skeleton} isLoaded={!user.loading} gap="3">
        {user.data ? (
          <>
            <Button
              colorScheme="red"
              variant="outline"
              borderRadius="full"
              size="lg"
              as={Link}
              to="/user"
            >
              Account Data
            </Button>
          </>
        ) : (
          <>
            <Button
              colorScheme="red"
              variant="outline"
              borderRadius="full"
              size="lg"
              as={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              as={Link}
              to="/register"
              colorScheme="red"
              borderRadius="full"
              size="lg"
            >
              Register
            </Button>
          </>
        )}
        <UserAvatar
          email={user.data?.email}
          isAuthenticated={user.data}
          profilePhoto={user.data?.photoURL}
          username={user.data?.username}
        />
      </HStack>
    </Flex>
  );
};
