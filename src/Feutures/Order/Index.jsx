import React from "react";
import { FormWrapper } from "./FormWrapper/FormWrapper";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { useMultipleFormSteps } from "../../Hooks/useMultipleFormSteps/useMultipleFormSteps";
import { UserInformation } from "./Steps/UserInformation/UserInformation";
import { ProgressBar } from "../../Components/Common/ProgressBar/ProgressBar";
import { Logo } from "../../Components/Common/Logo/Logo";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Rugs } from "./Steps/Rugs/Rugs";
import { UserLocation } from "./Steps/UserLocation/UserLocation";
import { schema } from "./schema";
export default function Index() {
  const {
    currentStepIndex,
    wrapperTransionStyles,
    CurrentStep,
    formState: { errors },
    register,
    control,
    setValue,
    isLastStep,
    isFirstStep,
    isSubmitting,
    handleSubmit,
    HandleNext,
    HandlePrev,
    watch,
  } = useMultipleFormSteps({
    steps: [
      {
        Component: Rugs,
        fieldsRequired: [],
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
  const onSubmit = (data) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <FormWrapper>
      <Stack
        alignItems="center"
        w="100%"
        maxW="600px"
        bgColor="white"
        p="3"
        borderRadius="lg"
      >
        <ProgressBar size="sm" steps={3} current={currentStepIndex + 1} />
      </Stack>

      <Stack
        justifyContent="center"
        alignItems="center"
        p="3"
        borderRadius="lg"
        bgColor="white"
        w="100%"
        maxW="600px"
        gap="4"
        overflow="hidden"
        boxShadow="lg"
      >
        <Logo w="120px" />
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
