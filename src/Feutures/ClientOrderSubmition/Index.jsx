import {
  Button,
  Flex,
  Heading,
  Input,
  Skeleton,
  Stack,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  InputGroup,
  InputRightAddon,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import React, { lazy, useEffect } from "react";
import { ChakraDatePicker } from "../../Components/Common/ChakraDatePicker/ChakraDatePicker";
import { CenteredTextWithLines } from "../../Components/Common/CenteredTextWithLines/CenteredTextWithLines";
import { useGetDoc } from "../../@Firebase/Hooks/Common/useGetDoc/useGetDoc";
import { FormWrapper } from "./FormWrapper/FormWrapper";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { ErrorText } from "../../Components/Common/ErrorText/ErrorText";
import { Order } from "../../@Firebase/Utils/Order/Order";
import { InvoicePDF } from "../../Components/Common/InvoicePdf/InvoicePdf";
import { useGetCollectionWithPaginationInCursors } from "../../@Firebase/Hooks/Common/useCollectionWithPagination(Cursors)/useCollectionWithPagination(Cursors)";
import { PDFViewer } from "@react-pdf/renderer";
import { Rug } from "./Components/Rug/Rug";
import { sumTotalPrice } from "../../Utils/RugsTotalPrice/RugsTotalPrice";
import { useUserData } from "../../Context/UserDataProvider/UserDataPRovider";
const InvoicePdf = ({ onClose, isOpen, data }) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Invoice Pdf</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <PDFViewer height="600px" width="100%">
            <InvoicePDF data={data} />
          </PDFViewer>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Download The Pdf</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

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
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    register,
  } = useForm({
    resolver: zodResolver(schema),
  });
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

  const collectionDate = useWatch({ name: "collectionDate", control });
  const collectionDate2 = useWatch({ name: "collectionDate2", control });

  const { fields: Rugs, replace } = useFieldArray({
    control,
    name: "RugsUploaded",
  });

  const HandleChangeStartDate = (selectedDate) => {
    setValue("collectionDate", new Date(selectedDate)?.toLocaleString());
  };
  const HandleChangeCollectionDate2 = (selectedDate) => {
    setValue("collectionDate2", new Date(selectedDate)?.toLocaleString());
  };

  const onSubmit = async (data) => {
    try {
      const Order_Init = new Order({
        status: "accepted",
        totalPrice: sumTotalPrice(
          data.RugsUploaded.map((rug) => {
            return rug.value;
          })
        ),
        ...data,
      });

      await Order_Init.onConfirmByClient({
        orderId: id,
        collectionDate: data.collectionDate,
        collectionDate2: data.collectionDate2,
        billingAddress: data.billingAddress,
        isThereDifferentBillingAddress: data.isThereDifferentBillingAddress,
        isThereInvoiceRef: data.isThereInvoiceRef,
        InvoiceRef: data.InvoiceRef,
      });

      toast({
        title:
          "Order Submited Successfully we will send a deleivery to collect the order",
        status: "success",
      });
      Navigate(`/orders/${id}/invoice-pdf`);
    } catch (err) {
      console.log(err);
      toast({
        title: "error in submiting the request",
        status: "error",
      });
    }
  };

  useEffect(() => {
    const formattedRugs = formatRugsUploadedData(RugsUploaded);
    if (data) {
      reset({
        ...data,
        collectionDate: data?.collectionDate,
        returnDate: data?.returnDate,
        RugsUploaded: formattedRugs,
      });
    }
  }, [JSON.stringify(data), JSON.stringify(RugsUploaded)]);
  const {
    isOpen: isInvoicePdfOpened,
    onOpen: onOpenInvoicePdf,
    onClose: onCloseInvoicePdf,
  } = useDisclosure();

  const onDeleteTreatment = ({ RugId, TreatmentValue }) => {
    replace(
      Rugs.map((rug) => {
        if (rug.id === RugId) {
          return {
            ...rug,
            value: {
              ...rug.value,
              RugCleaningOption: {
                ...rug.value.RugCleaningOption,
                Treatment: rug.value.RugCleaningOption.Treatment.filter(
                  (treatment) => {
                    return treatment.value !== TreatmentValue;
                  }
                ),
              },
            },
          };
        } else {
          return rug;
        }
      })
    );
  };

  const onDeleteService = ({ RugId, ServiceValue }) => {
    replace(
      Rugs.map((rug) => {
        if (rug.id === RugId) {
          return {
            ...rug,
            value: {
              ...rug.value,
              AdditionalServices: rug.value.AdditionalServices.filter(
                (service) => {
                  return service.value !== ServiceValue;
                }
              ),
            },
          };
        } else {
          return rug;
        }
      })
    );
  };

  const TotalPrice = sumTotalPrice(
    Rugs.map((Rug) => {
      return Rug.value;
    })
  );
  console.log(errors);

  const { user } = useUserData();
  console.log(data, "saas");
  if (data?.isAcceptedByClient) {
    return (
      <Stack p="3" alignItems="center">
        <Heading size="md" p="3" border="1px">
          Form Has Been Submited
        </Heading>
      </Stack>
    );
  }
  return (
    <>
      <InvoicePdf
        isOpen={isInvoicePdfOpened}
        onClose={onCloseInvoicePdf}
        data={{
          ...data,
          RugsUploaded,
        }}
      />
      <FormWrapper>
        <Stack
          as={Skeleton}
          isLoaded={!loading}
          justifyContent="center"
          alignItems="center"
          borderRadius="lg"
          bgColor="white"
          w="100%"
          gap="2"
          boxShadow="lg"
          pos="relative"
          p="4"
          pt="6"
          overflowX="hidden"
          overflowY="hidden"
          border="1px"
          borderColor="gray.300"
          maxW="1400px"
        >
          {data?.status === "accepted" && (
            <>
              <Button
                colorScheme="blackAlpha"
                onClick={onOpenInvoicePdf}
                variant="outline"
                w="100%"
              >
                View Invoice Pdf
              </Button>
              {Rugs.map((rugUploaded, index) => {
                return (
                  <Rug
                    RugData={rugUploaded?.value}
                    key={rugUploaded.id}
                    index={index}
                    control={control}
                    id={rugUploaded.id}
                    onDeleteTreatment={onDeleteTreatment}
                    onDeleteService={onDeleteService}
                  />
                );
              })}
              <Flex w="100%" flexWrap="wrap" gap="4" justifyContent="center">
                <Stack borderRadius="lg" bgColor="gray.100" p="3" flexGrow="1">
                  <CenteredTextWithLines TextAlign="left">
                    <Text flexShrink="0">Date Of Receiving Order</Text>
                  </CenteredTextWithLines>
                  <ChakraDatePicker
                    bgColor="white"
                    placeholder="Date Of Recieving Order"
                    minDate={Date.now()}
                    onChange={HandleChangeStartDate}
                    value={collectionDate}
                  />
                  <ErrorText>{errors?.collectionDate?.message}</ErrorText>
                </Stack>
                <Stack borderRadius="lg" bgColor="gray.100" p="3" flexGrow="1">
                  <CenteredTextWithLines TextAlign="left">
                    <Text flexShrink="0">Date Of Recieving Order 2</Text>
                  </CenteredTextWithLines>
                  <ChakraDatePicker
                    minDate={Date.now()}
                    bgColor="white"
                    placeholder="Date Of Recieving Order 2"
                    onChange={HandleChangeCollectionDate2}
                    value={collectionDate2}
                  />
                  <ErrorText>{errors?.collectionDate2?.message}</ErrorText>
                </Stack>
              </Flex>
              <InputGroup>
                <Input placeholder="Enter the Voucher Code" />
                <InputRightAddon as={Button}>Apply</InputRightAddon>
              </InputGroup>
              <Button w="100%" borderRadius="0">
                Total Price {TotalPrice} £
              </Button>
              <Text>Do you have a different Invoice | Billing Address?</Text>
              <Controller
                control={control}
                name="isThereDifferentBillingAddress"
                render={({ field }) => {
                  return (
                    <>
                      <RadioGroup
                        value={field.value || "No"}
                        onChange={(value) => field.onChange(value)}
                      >
                        <Flex gap="3">
                          <Radio value="No">No</Radio>
                          <Radio value="Yes">Yes</Radio>
                        </Flex>
                      </RadioGroup>
                      {field.value === "Yes" && (
                        <Flex gap="4" alignItems="start">
                          <Stack w="100%">
                            <Input
                              {...register("billingAddress.fullName")}
                              placeholder="Full name"
                            />
                            <ErrorText>
                              {errors?.billingAddress?.fullName?.message}
                            </ErrorText>
                          </Stack>
                          <Stack w="100%">
                            <Input
                              {...register("billingAddress.fullAddress")}
                              placeholder="Full Address"
                            />
                            <ErrorText>
                              {errors?.billingAddress?.fullName?.message}
                            </ErrorText>
                          </Stack>
                          <Stack w="100%">
                            <Input
                              {...register("billingAddress.postCode")}
                              placeholder="Post Code"
                            />
                            <ErrorText>
                              {errors?.billingAddress?.fullName?.message}
                            </ErrorText>
                          </Stack>
                        </Flex>
                      )}
                    </>
                  );
                }}
              />
              <Text>
                Do you have an order/works/job no. to add for invoice reference?
              </Text>
              <Controller
                control={control}
                name="isThereInvoiceRef"
                render={({ field }) => {
                  return (
                    <>
                      <RadioGroup
                        value={field.value || "No"}
                        onChange={(value) => field.onChange(value)}
                      >
                        <Flex gap="3">
                          <Radio value="No">No</Radio>
                          <Radio value="Yes">Yes</Radio>
                        </Flex>
                      </RadioGroup>
                      {field.value === "Yes" && (
                        <Stack alignItems="center">
                          <Input
                            {...register("InvoiceRef.name")}
                            placeholder="Order / Work /Jop /No"
                          />
                          <ErrorText>
                            {errors?.InvoiceRef?.name?.message}
                          </ErrorText>
                        </Stack>
                      )}
                    </>
                  );
                }}
              />
              <Flex mt="7" alignItems="center" justifyContent="center" gap="3">
                <Button
                  size="lg"
                  isLoading={isSubmitting}
                  onClick={handleSubmit(onSubmit)}
                  w="100%"
                  maxW="300px"
                  p="10"
                  colorScheme="yellow"
                  bgColor="rgb(238 211 145)"
                  whiteSpace="wrap"
                >
                  Confirm Works To Book Rug Collection
                </Button>
                <Text>Or</Text>
                <Button>Cancel Work</Button>
              </Flex>
            </>
          )}
          {data?.status !== "accepted" && data?.status && (
            <Heading size="md">
              The Order Status is {data?.status} Take A Screen And Contant With
              Us
            </Heading>
          )}
        </Stack>
      </FormWrapper>
    </>
  );
}
