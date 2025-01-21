import React, { Component, useEffect, useState } from "react";
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
  Box,
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
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { CenteredTextWithLines } from "../../Components/Common/CenteredTextWithLines/CenteredTextWithLines";
import { useUserData } from "../../Context/UserDataProvider/UserDataPRovider";
import { UserPassword } from "./Steps/UserPassword/UserPassword";
import { debounce } from "lodash";
import { IndexedDB } from "../../Utils/IndexDbClass/IndexDb";
import {
  getImage,
  saveImage,
} from "../../Utils/SaveImagesToIndexDb/SaveImagesToIndexDb";
import { v4 } from "uuid";

const errorNavigation = {
  "auth/email-already-in-use": 2,
};
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
export default function Index() {
  const Navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const AffilateSearch = searchParams.get("Affiliate");
  useEffect(() => {
    if (AffilateSearch) {
      localStorage.setItem("Affiliate", AffilateSearch);
    }
  }, [AffilateSearch]);

  useEffect(() => {
    if (localStorage.getItem("Affiliate") && !AffilateSearch) {
      Navigate("?Affiliate=pks@gmail.com");
    }
  }, []);

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
    getValues,
    watch,
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
    defaultValues: async () => {
      const OrderData = localStorage.getItem("Order-Saved");
      if (OrderData) {
        const Data = JSON.parse(OrderData);
        const RugsUploadedWithImagesUploadedToIndexDb = await Promise.all(
          Data.RugsUploaded?.map(async (Item) => {
            const RugImages = Item.value.RugCleaningOption.RugImages;
            if (RugImages) {
              const UploadedRugImages = await Promise.all(
                RugImages.map(async (RugImage) => {
                  if (RugImage.ImageUploadKey) {
                    const ImageDataURL = await getImage(
                      RugImage.ImageUploadKey
                    );

                    return {
                      ...RugImage,
                      value: ImageDataURL,
                    };
                  }
                  return RugImage;
                })
              );
              return {
                ...Item,
                value: {
                  ...Item.value,
                  RugCleaningOption: {
                    ...Item.value.RugCleaningOption,
                    RugImages: UploadedRugImages,
                  },
                },
              };
            } else {
              return Item;
            }
          })
        );
        return {
          ...Data,
          RugsUploaded: RugsUploadedWithImagesUploadedToIndexDb,
        };
      }
    },
  });
  const form = watch();
  const [debouncedForm, setDebouncedForm] = useState(form);

  useEffect(() => {
    if (!isEmptyObject(form)) {
      const debouncedUpdate = debounce(() => {
        setDebouncedForm(form);
      }, 1000);
      debouncedUpdate();
      return () => {
        debouncedUpdate.cancel();
      };
    }
  }, [JSON.stringify(form)]);

  useEffect(() => {
    if (!isEmptyObject(debouncedForm)) {
      (async function () {
        const Order = debouncedForm;
        const DataSaved = { ...Order };
        if (Order.RugsUploaded) {
          const RugsUploadedWithImagesUploadedToIndexDb = await Promise.all(
            Order.RugsUploaded.map(async (Item) => {
              const RugImages = Item.value.RugCleaningOption.RugImages;
              if (RugImages) {
                const UploadedRugImages = await Promise.all(
                  RugImages.map(async (RugImage) => {
                    if (!RugImage.ImageUploadKey) {
                      const ImageUploadKey = v4();
                      await saveImage(ImageUploadKey, RugImage.value);
                      return {
                        ...RugImage,
                        ImageUploadKey,
                      };
                    }
                    return RugImage;
                  })
                );
                return {
                  ...Item,
                  value: {
                    ...Item.value,
                    RugCleaningOption: {
                      ...Item.value.RugCleaningOption,
                      RugImages: UploadedRugImages,
                    },
                  },
                };
              } else {
                return Item;
              }
            })
          );
          DataSaved.RugsUploaded = RugsUploadedWithImagesUploadedToIndexDb;
        }
        localStorage.setItem("Order-Saved", JSON.stringify(DataSaved));
      })();
    }
  }, [JSON.stringify(debouncedForm)]);

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
        ...getValues(),
      });
    }
  }, [user.data]);
  const onSubmit = async (data) => {
    try {
      const OrderInit = new Order({
        ...data,
        isSignedIn: user.data ? true : false,
        userId: user.data?.uid,
        affiliate: AffilateSearch,
      });
      await OrderInit.onAdd();

      toast({
        status: "success",
        title: "Success",
        description:
          "Order Submited Successfully we will Respond As soon As possible To You",
      });
      Navigate("/thanks-page");
      localStorage.removeItem("Order-Saved");
      localStorage.removeItem("Affiliate");
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

        <Flex direction="column" align="center" justify="center" color="black">
          {/* Heading */}
          <Box
            fontFamily="Times New Roman, Georgia, serif"
            fontSize={{ base: "20px", md: "24px" }}
          >
            <Text
              fontFamily="mgichand"
              fontSize={{ base: "20px", md: "24px" }}
              textAlign="center"
              fontWeight="500"
            >
              Rug Works and Services
            </Text>
          </Box>

          {/* Subheading */}
          <Flex direction="column" justify="center" mx={11} pt={4}>
            <Text
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="sm"
              textAlign="center"
            >
              <Text as="span" color="#b81918" lineHeight="1.6em" mx={1}>
                ●
              </Text>
              FREE ONLINE ESTIMATE | ORDER REQUEST FORM
              <Text as="span" color="#b81918" mx={1}>
                ●
              </Text>
            </Text>
          </Flex>
        </Flex>

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
