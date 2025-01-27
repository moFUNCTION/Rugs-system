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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  IconButton,
  Divider,
  Checkbox,
  Tooltip,
} from "@chakra-ui/react";
import React, { lazy, useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { ChakraDatePicker } from "../../Components/Common/ChakraDatePicker/ChakraDatePicker";
import { CenteredTextWithLines } from "../../Components/Common/CenteredTextWithLines/CenteredTextWithLines";
import { useGetDoc } from "../../@Firebase/Hooks/Common/useGetDoc/useGetDoc";
import { FormWrapper } from "./FormWrapper/FormWrapper";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { Discount } from "../../@Firebase/Utils/Discount/Discount";
import { MdCancel } from "react-icons/md";
import SendEmailAdmin from "../../@Firebase/Utils/email/RequestToAdmin";
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
  const [isAcceptedTermsAndConditions, setIsAcceptedTermsAndConditions] =
    useState(false);
  const { id } = useParams();
  const { user } = useUserData();
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
    setError,
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

  const { fields: Rugs, replace } = useFieldArray({
    control,
    name: "RugsUploaded",
  });

  const onSubmit = async (data) => {
    try {
      if (!data.collectionDate) {
        setError("collectionDate", "Required");
        return;
      }
      if (!data.collectionDate2) {
        setError("collectionDate2", "Required");
        return;
      }
      const Order_Init = new Order({
        status: "order",
        totalPrice: sumTotalPrice(
          data.RugsUploaded.map((rug) => {
            return rug.value;
          })
        ),
        [DiscountData && "discount"]: DiscountData?.id,
        ...data,
      });

      await Order_Init.onConfirmByClient({
        orderId: id,
        collectionDate: new Date(data.collectionDate).toLocaleString(),
        collectionDate2: new Date(data.collectionDate2).toLocaleString(),
        billingAddress: data.billingAddress,
        isThereDifferentBillingAddress: data.isThereDifferentBillingAddress,
        isThereInvoiceRef: data.isThereInvoiceRef,
        InvoiceRef: data.InvoiceRef,
      });
      await SendEmailAdmin({
        title: user.data.title,
        fname: user.data.firstName,
        sname: user.data.lastName,
      });

      toast({
        title:
          "Order Submited Successfully we will send a deleivery to collect the order",
        status: "success",
      });
      Navigate(`/orders/${id}/receipt-pdf`);
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

  const DiscountBoxRef = useRef();
  const [DiscountData, setDiscountData] = useState();

  const [isLoadingDiscount, setIsLoadingDiscount] = useState(false);

  const onApplyDiscount = async () => {
    try {
      setIsLoadingDiscount(true);
      const res = await Discount.GetDiscount({
        id: DiscountBoxRef.current.value,
      });
      if (res.isExist === false) {
        toast({
          status: "error",
          title: "In Valid Discount",
        });
        return;
      }
      if (res.isExpired === true) {
        toast({
          status: "error",
          title: "Expired Discount",
        });
        return;
      }
      setDiscountData(res);
      toast({
        status: "success",
        title: "Discount Have Applied Successfully",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingDiscount(false);
    }
  };

  if (data?.isAcceptedByClient) {
    return (
      <Stack p="3" alignItems="center">
        <Heading size="md" p="3" border="1px">
          Form Has Been Submited
        </Heading>
      </Stack>
    );
  }
  if (data?.email !== user?.data?.email) {
    return (
      <Stack bgColor="red.100" p="3" alignItems="center">
        <Heading size="md" p="3" border="1px">
          Permision Denied
        </Heading>
      </Stack>
    );
  }

  return (
    <>
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
          {data?.status === "qutation" && (
            <>
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

              <Button
                justifyContent="end"
                size="lg"
                bgColor="rgb(229 231 235)"
                w="100%"
                borderRadius="0"
                pointerEvents="none"
              >
                <Flex
                  justifyContent="space-between"
                  style={{ width: "100%", maxWidth: "500px" }}
                >
                  Rug Works and Services Costs <span>{TotalPrice}£</span>
                </Flex>
              </Button>
              {DiscountData && (
                <>
                  <Button
                    justifyContent="end"
                    colorScheme="orange"
                    variant="outline"
                    size="lg"
                    w="100%"
                    borderRadius="0"
                  >
                    <IconButton
                      borderRadius="0"
                      colorScheme="orange"
                      variant="ghost"
                      onClick={() => setDiscountData(undefined)}
                      mr="auto"
                    >
                      <IoCloseOutline />
                    </IconButton>
                    <Flex
                      justifyContent="space-between"
                      style={{ width: "100%", maxWidth: "500px" }}
                    >
                      VIP Discount Voucher @ {DiscountData?.discount}%
                      <span
                        style={{
                          marginLeft: "auto",
                        }}
                      >
                        {(TotalPrice * DiscountData?.discount) / 100} £
                      </span>
                    </Flex>
                  </Button>

                  <Button
                    justifyContent="end"
                    size="lg"
                    bgColor="rgb(229 231 235)"
                    w="100%"
                    borderRadius="0"
                    pointerEvents="none"
                  >
                    <Flex
                      justifyContent="space-between"
                      style={{ width: "100%", maxWidth: "500px" }}
                    >
                      Total Estimate Cost (excluding VAT):{" "}
                      <span>
                        {TotalPrice -
                          (TotalPrice * DiscountData?.discount) / 100}
                        £
                      </span>
                    </Flex>
                  </Button>
                </>
              )}
              {!DiscountData && (
                <InputGroup size="lg">
                  <Input
                    ref={DiscountBoxRef}
                    placeholder="Enter the Voucher Code"
                  />
                  <InputRightAddon
                    isLoading={isLoadingDiscount}
                    onClick={onApplyDiscount}
                    as={Button}
                  >
                    Apply
                  </InputRightAddon>
                </InputGroup>
              )}
              {!DiscountData && (
                <Button
                  justifyContent="end"
                  size="lg"
                  bgColor="rgb(229 231 235)"
                  w="100%"
                  borderRadius="0"
                  pointerEvents="none"
                >
                  <Flex
                    justifyContent="space-between"
                    style={{ width: "100%", maxWidth: "500px" }}
                  >
                    Total Estimate Cost (excluding VAT):{" "}
                    <span>{TotalPrice}£</span>
                  </Flex>
                </Button>
              )}

              <Text my="2" fontSize="lg">
                Please select two alternative dates for rug collection:
              </Text>

              <Flex w="100%" flexWrap="wrap" gap="4" justifyContent="center">
                <Stack borderRadius="lg" bgColor="gray.100" p="3" flexGrow="1">
                  <Controller
                    control={control}
                    name="collectionDate"
                    render={({ field }) => {
                      return (
                        <>
                          <ChakraDatePicker
                            bgColor="white"
                            placeholder="Select First Date"
                            minDate={Date.now()}
                            onChange={(value) => field.onChange(value)}
                            value={field.value}
                          />
                          <ErrorText>
                            {errors?.collectionDate?.message}
                          </ErrorText>
                        </>
                      );
                    }}
                  />
                </Stack>
                <Stack borderRadius="lg" bgColor="gray.100" p="3" flexGrow="1">
                  <Controller
                    control={control}
                    name="collectionDate2"
                    render={({ field }) => {
                      return (
                        <>
                          <ChakraDatePicker
                            bgColor="white"
                            placeholder="Select First Date"
                            minDate={Date.now()}
                            onChange={(value) => field.onChange(value)}
                            value={field.value}
                          />
                          <ErrorText>
                            {errors?.collectionDate?.message}
                          </ErrorText>
                        </>
                      );
                    }}
                  />
                </Stack>
              </Flex>
              <Divider />

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
              <Divider w="100%" maxW="500px" my="6" />
              <Checkbox
                onChange={(e) =>
                  setIsAcceptedTermsAndConditions(e.target.checked)
                }
                size="lg"
                isChecked={isAcceptedTermsAndConditions}
              >
                Accept
                <a
                  style={{
                    textDecoration: "underline",
                    color: "blue",
                    marginLeft: "6px",
                  }}
                  target="_blank"
                  href="https://magichand.co.uk/terms-and-conditions"
                >
                  terms and conditions
                </a>
              </Checkbox>
              <Flex mt="7" alignItems="center" justifyContent="center" gap="3">
                <Tooltip
                  label={
                    !isAcceptedTermsAndConditions &&
                    "please accept terms and conditions"
                  }
                >
                  <Button
                    isDisabled={!isAcceptedTermsAndConditions}
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
                </Tooltip>
                <Text>Or</Text>
                <Tooltip
                  label={
                    !isAcceptedTermsAndConditions &&
                    "please accept terms and conditions"
                  }
                >
                  <Button
                    isDisabled={!isAcceptedTermsAndConditions}
                    as={Link}
                    to={`/orders/${id}/cancel`}
                  >
                    Cancel Work
                  </Button>
                </Tooltip>
              </Flex>
            </>
          )}

          {data?.status !== "qutation" && data?.status && (
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
