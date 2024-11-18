import React from "react";
import { Box, Text, Stack, Avatar, Badge } from "@chakra-ui/react";
import { useUserData } from "../../Context/UserDataProvider/UserDataPRovider";

export default function Index() {
  const { user } = useUserData();
  const {
    username,
    email,
    emailVerified,
    phoneNumber,
    locationAddress,
    locationPostCode,
    accountType,
    photoURL,
    metadata,
  } = user.data ? user.data : { metadata: {} };
  return (
    <Stack
      h="calc(100vh - 100px)"
      borderWidth="1px"
      overflow="hidden"
      p={5}
      bg="gray.50"
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        bgColor="white"
        p="3"
        w="100%"
        maxW="lg"
        borderRadius="lg"
        spacing={4}
      >
        {/* Avatar */}
        <Stack direction="row" align="center">
          <Avatar size="lg" src={photoURL || ""} name={username} />
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              {username}
            </Text>
            <Badge colorScheme={emailVerified ? "green" : "red"}>
              {emailVerified ? "Email Verified" : "Email Not Verified"}
            </Badge>
          </Box>
        </Stack>

        {/* User Info */}
        <Box>
          <Text>
            <strong>Email:</strong> {email}
          </Text>
          <Text>
            <strong>Phone Number:</strong> {phoneNumber}
          </Text>
          <Text>
            <strong>Account Type:</strong> {accountType}
          </Text>
        </Box>

        {/* Address */}
        <Box>
          <Text>
            <strong>Location Address:</strong> {locationAddress}
          </Text>
          <Text>
            <strong>Post Code:</strong> {locationPostCode}
          </Text>
        </Box>

        {/* Metadata */}
        <Box>
          <Text>
            <strong>Account Created:</strong>{" "}
            {new Date(metadata.creationTime).toLocaleString()}
          </Text>
          <Text>
            <strong>Last Login:</strong>{" "}
            {new Date(metadata.lastSignInTime).toLocaleString()}
          </Text>
        </Box>
      </Stack>
    </Stack>
  );
}
