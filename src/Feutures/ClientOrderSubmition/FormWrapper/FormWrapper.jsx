import { Stack, useToast } from "@chakra-ui/react";
import { LazyLoadedImage } from "../../../Components/Common/LazyLoadedImage/LazyLoadedImage";
import BackgroundImage from "../../../Assets/Backgrounds/cool-background (1).png";
export const FormWrapper = ({ children }) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      w="100%"
      minH="calc(100vh - 100px)"
      pos="relative"
      zIndex="2"
      p="4"
      bgColor="gray.100"
    >
      {children}
    </Stack>
  );
};
