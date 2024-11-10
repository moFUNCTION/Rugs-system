import { Stack, useToast } from "@chakra-ui/react";
import { LazyLoadedImage } from "../../../Components/Common/LazyLoadedImage/LazyLoadedImage";
import BackgroundImage from "../../../Assets/Backgrounds/cool-background (1).png";
export const FormWrapper = ({ children }) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      w="100%"
      minH="100vh"
      pos="relative"
      zIndex="2"
      p="4"
      bgColor="gray.300"
    >
      {/* <LazyLoadedImage
        w="100%"
        h="100%"
        pos="absolute"
        ImageProps={{
          objectFit: "cover",
          filter: "saturate(0)",
          opacity: "0.5",
        }}
        zIndex="-1"
        src={BackgroundImage}
      /> */}
      {children}
    </Stack>
  );
};
