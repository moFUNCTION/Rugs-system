import { Navigate } from "react-router-dom";
import { CircularProgress, Stack } from "@chakra-ui/react";
import { useUserData } from "../../Context/UserDataProvider/UserDataPRovider";

export const ProtectedRoute = ({
  condition,
  navigate: { to, message },
  children,
  isLoading,
}) => {
  const { user } = useUserData();
  if (isLoading || user.loading) {
    return (
      <Stack
        w="100%"
        minH="calc(100vh - 89px)"
        alignItems="center"
        justifyContent="center"
        gap="5"
      >
        <CircularProgress isIndeterminate />
      </Stack>
    );
  } else {
    if (condition) {
      return children;
    } else {
      return <Navigate to={to} state={{ message }} />;
    }
  }
};
