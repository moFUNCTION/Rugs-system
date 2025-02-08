import { Button } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export const OrderPageBtnNavigation = () => {
  const { pathname } = useLocation();
  if (pathname !== "/" && pathname !== "/order" && pathname !== "") {
    return (
      <Button
        colorScheme="yellow"
        bgColor="rgb(238 211 145)"
        borderRadius="full"
        pos="fixed"
        bottom="3"
        right="3"
        zIndex="1000000"
        as={Link}
        to="/"
        size="lg"
      >
        Navigate To Order Page
      </Button>
    );
  }
};
