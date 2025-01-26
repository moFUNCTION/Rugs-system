import {
  Alert,
  AlertIcon,
  Button,
  Checkbox,
  Divider,
  Heading,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useUserData } from "../../Context/UserDataProvider/UserDataPRovider";
import { useFieldArray, useForm } from "react-hook-form";
import { Order } from "../../@Firebase/Utils/Order/Order";
import { useParams } from "react-router-dom";
import { useGetDoc } from "../../@Firebase/Hooks/Common/useGetDoc/useGetDoc";
const cancelReasons = [
  "Changed My Mind",
  "Difficult to use an online form.",
  "The estimate is beyond my budget at this time",
];
export default function Index() {
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const { id } = useParams();
  const { user } = useUserData();
  const { data, error, loading } = useGetDoc({
    docId: id,
    __collection__: "Orders",
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const { fields, append, replace } = useFieldArray({
    control,
    name: "cancelReasons",
  });
  const HandleAddField = (value) => {
    append({
      value,
    });
  };
  const HandleRemoveField = (value) => {
    replace(
      fields.filter((field) => {
        return field.value !== value;
      })
    );
  };
  const onSubmit = async (data) => {
    try {
      await Order.onCancelWork({
        ...data,
        orderId: id,
        cancelReasons: data.cancelReasons.map((value) => {
          return value.value;
        }),
      });
      toast({
        status: "success",
        title: "Cancel Work Successfully",
      });
    } catch (err) {
      toast({
        status: "error",
        title: "Error In Cancel Work",
      });
    }
  };
  if (!data || data?.status !== "qutation") {
    return (
      <Stack p="5">
        <Alert status="error">
          <AlertIcon />
          Permision Denied To Cancel Work
        </Alert>
      </Stack>
    );
  }
  return (
    <Stack
      minH="500px"
      justifyContent="center"
      gap="8"
      p="3"
      alignItems="center"
    >
      <Text
        fontSize={{ base: "22px", sm: "26px" }}
        color="black"
        flexShrink="0"
        w="100%"
        maxW="600px"
      >
        Dear {user.data?.title} {user.data?.firstName} {user.data?.lastName} ,
      </Text>
      <Divider w="100%" maxW="600px" />
      <Text
        fontSize={{ base: "22px", sm: "26px" }}
        color="black"
        flexShrink="0"
        w="100%"
        maxW="600px"
      >
        To help us better understand our Customers’ needs, please tick the
        reasons below for the cancellation of rug works:
      </Text>
      <Stack gap="3" w="100%" maxW="600px" alignItems="start">
        {cancelReasons.map((reason) => {
          return (
            <Checkbox
              isChecked={fields.find((item) => item.value === reason)}
              onChange={(e) => {
                if (e.target.checked) {
                  HandleAddField(reason);
                } else {
                  HandleRemoveField(reason);
                }
              }}
              key={reason}
            >
              {reason}
            </Checkbox>
          );
        })}
        <Textarea
          {...register("cancelComment")}
          mt="2"
          placeholder="add a comment"
        />
      </Stack>
      <Button
        isLoading={isSubmitting}
        onClick={handleSubmit(onSubmit)}
        w="100%"
        maxW="600px"
      >
        Submit
      </Button>
    </Stack>
  );
}
