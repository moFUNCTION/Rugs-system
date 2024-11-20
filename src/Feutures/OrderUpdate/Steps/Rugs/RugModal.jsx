import { Button, Stack } from "@chakra-ui/react";
import { useMultipleFormSteps } from "../../../../Hooks/useMultipleFormSteps/useMultipleFormSteps";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ProgressBar } from "../../../../Components/Common/ProgressBar/ProgressBar";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { RugSchema } from "../../schema";
import { RugPropertiesStep } from "./Steps/RugPropertiesStep";
import { RugCleaningOptionStep } from "./Steps/RugCleaningOptionStep";
import { RugAdditionalService } from "./Steps/RugAdditionalService";
import { RugCommentStep } from "./Steps/RugCommentStep";

export const RugModal = ({
  isOpen,
  onClose,
  defaultValues,
  role = "Add",
  index,
  onSubmit,
}) => {
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
        Component: RugPropertiesStep,
        fieldsRequired: ["UnitSelector", "length", "width", "RugMaterial"],
      },
      {
        Component: RugCleaningOptionStep,
        fieldsRequired: ["RugCleaningOption"],
      },
      {
        Component: RugAdditionalService,
      },
      {
        Component: RugCommentStep,
      },
    ],
    schema: RugSchema,
    mode: "onBlur",
    defaultValues: async () => {
      return defaultValues;
    },
  });

  return (
    <Modal size="2xl" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent overflow="auto" maxH="calc(100% - 40px)" m="3">
        <ModalHeader>
          {role === "Update" ? `Rug ${index}` : "Adding Rug"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack
            alignItems="center"
            w="100%"
            maxW="600px"
            bgColor="white"
            p="3"
            borderRadius="lg"
          >
            <ProgressBar size="sm" steps={4} current={currentStepIndex + 1} />
          </Stack>

          <Stack
            justifyContent="center"
            alignItems="center"
            p="3"
            w="100%"
            gap="4"
            overflowX="hidden"
            minH="250px"
            overflowY="auto"
          >
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
          </Stack>
        </ModalBody>

        <ModalFooter gap="3">
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
