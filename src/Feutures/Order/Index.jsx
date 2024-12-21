import React, { Component, useEffect } from "react";
import { FormWrapper } from "./FormWrapper/FormWrapper";
import {
  Button,
  Flex,
  Heading,
  Stack,
  useToast,
  Text,
  Progress,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Skeleton,
} from "@chakra-ui/react";
import { useMultipleFormSteps } from "../../Hooks/useMultipleFormSteps/useMultipleFormSteps";
import { UserInformation } from "./Steps/UserInformation/UserInformation";
import { ProgressBar } from "../../Components/Common/ProgressBar/ProgressBar";
import { Logo } from "../../Components/Common/Logo/Logo";
import { motion, steps } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Rugs } from "./Steps/Rugs/Rugs";
import { UserLocation } from "./Steps/UserLocation/UserLocation";
import { schema } from "./schema";
import localforage from "localforage";
import { Order } from "../../@Firebase/Utils/Order/Order";
import { useNavigate } from "react-router-dom";
import { CenteredTextWithLines } from "../../Components/Common/CenteredTextWithLines/CenteredTextWithLines";
import { useUserData } from "../../Context/UserDataProvider/UserDataPRovider";
import { UserPassword } from "./Steps/UserPassword/UserPassword";

const errorNavigation = {
  "auth/email-already-in-use": 2,
};
export default function Index() {
  const Navigate = useNavigate();
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const { user } = useUserData();
  const {
    currentStepIndex,
    wrapperTransionStyles,
    CurrentStep,
    formState: { errors, isSubmitting },
    register,
    control,
    setValue,
    isLastStep,
    isFirstStep,
    handleSubmit,
    HandleNext,
    HandlePrev,
    reset,
    HandleChangeCurrentStepIndex,
    setError,
  } = useMultipleFormSteps({
    steps: [
      {
        Component: Rugs,
        fieldsRequired: ["RugsUploaded"],
      },
      {
        Component: UserInformation,
        fieldsRequired: ["username", "email", "phoneNumber", "title"],
      },
      {
        Component: UserPassword,
        fieldsRequired: ["password", "confirmPassword"],
      },
      {
        Component: UserLocation,
        fieldsRequired: ["RugCollectionAddress", "RugReturnAddress"],
      },
    ],
    schema: schema,
    mode: "onBlur",
  });

  useEffect(() => {
    if (user.data) {
      reset({
        email: user.data?.email,
        username: user.data?.username,
        phoneNumber: user.data?.phoneNumber,
        RugCollectionAddress: user.data?.locationAddress,
        RugCollectionAddressPostCode: user.data?.locationPostCode,
        title: user?.data?.title,
        firstName: user.data?.firstName,
        lastName: user.data?.lastName,
      });
    }
  }, [user.data]);
  const onSubmit = async (data) => {
    try {
      const OrderInit = new Order({
        ...data,
        isSignedIn: user.data ? true : false,
        userId: user.data?.uid,
      });
      await OrderInit.onAdd();

      toast({
        status: "success",
        title: "Success",
        description:
          "Order Submited Successfully we will Respond As soon As possible To You",
      });
      Navigate("/thanks-page");
    } catch (err) {
      setError("root", { message: err.message });
      HandleChangeCurrentStepIndex(errorNavigation[err.message] - 1);
      toast({
        status: "error",
        title: "Error",
        description: err.message,
      });
    }
  };

  return (
    <FormWrapper>
      <Stack
        alignItems="center"
        w="100%"
        maxW="800px"
        bgColor="white"
        p="3"
        borderRadius="lg"
      >
        <ProgressBar
          justifyContent="center"
          w="100%"
          size="sm"
          steps={3}
          current={currentStepIndex + 1}
        />
      </Stack>

      <Stack
        as={Skeleton}
        isLoaded={!user.loading}
        justifyContent="center"
        alignItems="center"
        borderRadius="lg"
        bgColor="white"
        w="100%"
        maxW="800px"
        gap="4"
        overflow="hidden"
        boxShadow="lg"
        pos="relative"
        p="4"
        pt="6"
      >
        <Progress
          pos="absolute"
          top="0"
          w="100%"
          h="5px"
          transition="0.3s"
          value={(currentStepIndex / 2) * 100}
        />
        <Heading size="md" color="gray.600">
          Rug Works and Services
        </Heading>
        <CenteredTextWithLines>
          <Text flexShrink="0" size="sm">
            FREE ONLINE ESTIMATE | ORDER REQUEST FORM
          </Text>
        </CenteredTextWithLines>
        {errors.root && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errors.root?.message}</AlertDescription>
          </Alert>
        )}

        <motion.div
          style={{
            width: "100%",
            gap: "10px",
            display: "flex",
            flexDirection: "column",
          }}
          {...wrapperTransionStyles}
          key={currentStepIndex}
        >
          <CurrentStep
            errors={errors}
            currentStepIndex={currentStepIndex}
            register={register}
            control={control}
            setValue={setValue}
          />
        </motion.div>
        <Flex w="100%" justifyContent="end" gap="3">
          <Button
            isDisabled={isFirstStep}
            onClick={HandlePrev}
            gap="3"
            variant="outline"
          >
            <FaArrowLeft />
            Prev
          </Button>

          {isLastStep ? (
            <Button
              isLoading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              gap="3"
              colorScheme="red"
            >
              Create Order
            </Button>
          ) : (
            <Button onClick={HandleNext} gap="3">
              Next
              <FaArrowRight />
            </Button>
          )}
        </Flex>
      </Stack>
    </FormWrapper>
  );
}
