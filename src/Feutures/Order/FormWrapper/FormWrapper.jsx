import { Stack, useToast } from "@chakra-ui/react";
import { LazyLoadedImage } from "../../../Components/Common/LazyLoadedImage/LazyLoadedImage";
import BackgroundImage from "../../../Assets/Backgrounds/cool-background (1).png";
export const FormWrapper = ({ children }) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      w="100%"
      minH="70vh"
      pos="relative"
      zIndex="2"
      p="4"
    >
      {children}
    </Stack>
  );
};
