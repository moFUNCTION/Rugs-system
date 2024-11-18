import React, { useEffect } from "react";
import { FormWrapper } from "./FormWrapper/FormWrapper";
import {
  Button,
  Flex,
  Heading,
  Stack,
  useToast,
  Text,
  Progress,
  Skeleton,
  Badge,
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
import { useNavigate, useParams } from "react-router-dom";
import { CenteredTextWithLines } from "../../Components/Common/CenteredTextWithLines/CenteredTextWithLines";
import { useUserData } from "../../Context/UserDataProvider/UserDataPRovider";
import { useGetDoc } from "../../@Firebase/Hooks/Common/useGetDoc/useGetDoc";
import { useGetCollectionWithPaginationInCursors } from "../../@Firebase/Hooks/Common/useCollectionWithPagination(Cursors)/useCollectionWithPagination(Cursors)";
export default function Index() {
  const { id } = useParams();
  const Navigate = useNavigate();
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const { user } = useUserData();
  const { data, loading, error } = useGetDoc({
    __collection__: "Orders",
    docId: id,
  });
  const {
    data: RugsUploaded,
    loading: RugUploadedLoading,
    error: RugsUploadedError,
  } = useGetCollectionWithPaginationInCursors({
    __collection__: `Orders/${id}/RugsUploaded`,
    size: 30,
    orderByQueries: [],
  });
  console.log(RugsUploaded);
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
  } = useMultipleFormSteps({
    steps: [
      {
        Component: Rugs,
        fieldsRequired: ["RugsUploaded"],
      },
      {
        Component: UserInformation,
        fieldsRequired: ["username", "email", "phoneNumber"],
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
    reset({ ...data, RugsUploaded: RugsUploaded });
  }, [data, JSON.stringify(RugsUploaded)]);

  const onSubmit = async (data) => {
    try {
      const OrderInit = new Order(data);
      await OrderInit.onUpdate(id);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: data.email,
          username: data.email,
          phoneNumber: data.phoneNumber,
        })
      );

      toast({
        status: "success",
        title: "Success",
        description:
          "Order Updated Successfully we will Respond As soon As possible To You",
      });
      Navigate("/orders");
    } catch (err) {
      toast({
        status: "error",
        title: "Error",
        description: err.code || err.message,
      });
      console.log(err);
    }
  };

  return (
    <FormWrapper>
      <Stack
        as={Skeleton}
        isLoaded={!loading && !RugUploadedLoading}
        alignItems="center"
        w="100%"
        maxW="800px"
        bgColor="white"
        p="3"
        borderRadius="lg"
        pos="relative"
      >
        <Badge colorScheme="red" size="lg" pos="absolute" top="2" left="2">
          {data?.status}
        </Badge>
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
        isLoaded={!loading && !RugUploadedLoading}
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
              Update Order
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
