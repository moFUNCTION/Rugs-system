import React from "react";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import logo from "../../../Assets/Logo/MH-Logo-8847d87f.png";
import { useScroll, useTransform, motion } from "framer-motion";

export const LogoHeader = () => {
  const { scrollYProgress } = useScroll();

  // Transform the scroll progress into values for logo width and opacity
  const logoWidth = useTransform(scrollYProgress, [0, 0.7], [193.7, 90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const height = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["rgb(242, 242, 242)", "rgb(255, 255, 255)"]
  );

  return (
    <motion.div
      style={{
        backgroundColor,
        position: "sticky",
        top: 0,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "14px",
        paddingBottom: "25px",
        borderBottom: "1px solid rgb(242, 242, 242)",
        height: "fit-content",
      }}
    >
      <Box display="flex" justifyContent="center">
        <motion.div
          style={{
            width: logoWidth,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Image
            src={logo}
            alt="Logo"
            width="100%"
            height="100%"
            objectFit="contain"
          />
        </motion.div>
      </Box>
      <motion.div
        style={{
          opacity: textOpacity,
          paddingX: "44px",
          height,
          overflow: "hidden",
        }}
      >
        <VStack justifyContent="center">
          <Text
            color="#a17309"
            fontFamily="mgichand"
            letterSpacing="wide"
            textAlign="center"
            fontSize={["14px", "20px"]}
          >
            The Premier Rug and Oriental Carpet Cleaning, Repairs and
            Restoration Company
          </Text>
        </VStack>
      </motion.div>
    </motion.div>
  );
};
