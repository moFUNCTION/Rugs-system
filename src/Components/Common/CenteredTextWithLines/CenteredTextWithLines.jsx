import React from "react";
import { Box, Flex, Divider, Text } from "@chakra-ui/react";

export const CenteredTextWithLines = ({ children, ...rest }) => {
  return (
    <Flex gap="4" align="center" width="100%" {...rest}>
      <Divider borderColor="gray.400" />
      {children}
      <Divider borderColor="gray.400" />
    </Flex>
  );
};
