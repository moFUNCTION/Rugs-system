import {
  Button,
  Flex,
  Heading,
  Input,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { lazy, useEffect } from "react";
import { ChakraDatePicker } from "../../Components/Common/ChakraDatePicker/ChakraDatePicker";
import { CenteredTextWithLines } from "../../Components/Common/CenteredTextWithLines/CenteredTextWithLines";
import { useGetDoc } from "../../@Firebase/Hooks/Common/useGetDoc/useGetDoc";
import { FormWrapper } from "./FormWrapper/FormWrapper";
import { useParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { ErrorText } from "../../Components/Common/ErrorText/ErrorText";
import { Order } from "../../@Firebase/Utils/Order/Order";
import { InvoicePDF } from "../../Components/Common/InvoicePdf/InvoicePdf";
import { useGetCollectionWithPaginationInCursors } from "../../@Firebase/Hooks/Common/useCollectionWithPagination(Cursors)/useCollectionWithPagination(Cursors)";
import { Rugs } from "./Parts/Rugs/Rugs";
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

  const collectionDate = useWatch({ name: "collectionDate", control });
  const ReturnDate = useWatch({ name: "returnDate", control });
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
    } catch (err) {
      toast({
        title: "error in submiting the request",
        status: "error",
      });
    }
  };
  console.log(errors);

  return (
    <FormWrapper>
      <Stack
        as={Skeleton}
        isLoaded={!loading}
        justifyContent="center"
        alignItems="center"
        borderRadius="lg"
        bgColor="white"
        w="100%"
        maxW="800px"
        gap="2"
        boxShadow="lg"
        pos="relative"
        p="4"
        pt="6"
        overflowX="hidden"
        overflowY="hidden"
      >
        {data?.status === "accepted" && (
          <>
            <Rugs setValue={setValue} control={control} errors={errors} />
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

            <Button colorScheme="blackAlpha" variant="outline" w="100%">
              Click Here To See The Invoice Pdf
            </Button>
            <Input placeholder="Apply A Coupon Code" />
            <Button
              isLoading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              w="100%"
              colorScheme="red"
            >
              Submit
            </Button>
          </>
        )}
        {data?.status !== "accepted" && data?.status && (
          <Heading size="md">
            The Order Status is {data?.status} Take A Screen And Contant With Us
          </Heading>
        )}
      </Stack>
    </FormWrapper>
  );
}
