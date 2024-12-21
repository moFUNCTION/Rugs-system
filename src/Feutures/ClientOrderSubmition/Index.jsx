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
} from "@chakra-ui/react";
import React, { lazy, useEffect } from "react";
import { ChakraDatePicker } from "../../Components/Common/ChakraDatePicker/ChakraDatePicker";
import { CenteredTextWithLines } from "../../Components/Common/CenteredTextWithLines/CenteredTextWithLines";
import { useGetDoc } from "../../@Firebase/Hooks/Common/useGetDoc/useGetDoc";
import { FormWrapper } from "./FormWrapper/FormWrapper";
import { useNavigate, useParams } from "react-router-dom";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
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
  const ReturnDate = useWatch({ name: "returnDate", control });

  const { fields: Rugs, replace } = useFieldArray({
    control,
    name: "RugsUploaded",
  });

  const HandleChangeStartDate = (selectedDate) => {
    setValue("collectionDate", new Date(selectedDate)?.toLocaleString());
  };
  const HandleChangeEndDate = (selectedDate) => {
    setValue("returnDate", new Date(selectedDate)?.toLocaleString());
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
        returnDate: data.returnDate,
      });
      toast({
        title:
          "Order Submited Successfully we will send a deleivery to collect the order",
        status: "success",
      });
      Navigate("/thanks-page");
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
  console.log(RugsUploaded);

  const onDeleteTreatment = ({ RugId, TreatmentValue }) => {
    replace(
      Rugs.map((rug) => {
        console.log(rug.id, RugId);
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
        console.log(rug.id, RugId);
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
      console.log(Rug.value);
      return Rug.value;
    })
  );

  const { user } = useUserData();

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
                console.log(rugUploaded);
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
                    <Text flexShrink="0">Date Of Returning Order</Text>
                  </CenteredTextWithLines>
                  <ChakraDatePicker
                    minDate={Date.now()}
                    bgColor="white"
                    placeholder="Date Of Returning Order"
                    onChange={HandleChangeEndDate}
                    value={ReturnDate}
                  />
                  <ErrorText>{errors?.returnDate?.message}</ErrorText>
                </Stack>
              </Flex>
              <InputGroup>
                <Input placeholder="Enter the Voucher Code" />
                <InputRightAddon as={Button}>Apply</InputRightAddon>
              </InputGroup>
              <Button w="100%" colorScheme="green">
                Total Price {TotalPrice} £
              </Button>
              <Button
                isLoading={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                w="100%"
                colorScheme="orange"
              >
                Submit
              </Button>
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
