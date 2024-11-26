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

const processRugImages = (images) =>
  images?.map((image) => ({
    value: image.URL,
    id: image.URL,
  })) ?? [];

const formatRugsUploadedData = (rugsData) =>
  rugsData?.map((rug) => ({
    value: {
      ...rug,
      RugCleaningOption: {
        ...rug.RugCleaningOption,
        RugImages: processRugImages(rug?.RugCleaningOption?.RugImages),
        RugReceivedImages: processRugImages(
          rug?.RugCleaningOption?.RugReceivedImages
        ),
      },
    },
    id: rug.id,
  }));
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
    const formattedRugs = formatRugsUploadedData(RugsUploaded);
    reset({
      ...data,
      RugsUploaded: formattedRugs,
    });
  }, [JSON.stringify(RugsUploaded), JSON.stringify(data)]);

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

          <Button isDisabled={isLastStep} onClick={HandleNext} gap="3">
            Next
            <FaArrowRight />
          </Button>
        </Flex>
      </Stack>
    </FormWrapper>
  );
}
