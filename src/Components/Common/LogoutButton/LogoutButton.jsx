import { Button, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useLogout } from "../../../@Firebase/Hooks/Auth/useLogout/useLogout";

export const LogoutButton = ({ ...rest }) => {
  const { loading, error, onLogout } = useLogout();

  return (
    <Button onClick={onLogout} isLoading={loading} colorScheme="red" {...rest}>
      logout
    </Button>
  );
};
