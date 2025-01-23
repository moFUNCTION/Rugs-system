import React from "react";
import {
  Box,
  Button,
  Heading,
  VStack,
  Divider,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { InputElement } from "../../../Common/InputElement/InputElement";
import { MdEmail, MdGpsFixed, MdPhone } from "react-icons/md";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../../../Common/PasswordInput/PasswordInput";
import { CenteredTextWithLines } from "../../../Common/CenteredTextWithLines/CenteredTextWithLines";
import { Link } from "react-router-dom";
import { FaMapLocationDot, FaUser } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { ErrorText } from "../../../Common/ErrorText/ErrorText";
import { Create_New_User } from "../../../../@Firebase/Utils/Auth/Register/Register";
const RegisterBox = ({ ...rest }) => {
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      const user_create_init = new Create_New_User({
        ...data,
        firstName: data.username.split(" ")[0],
        lastName: data.username.split(" ").slice(-1)[0],
      });
      await user_create_init.onCreate();
      toast({
        title: "register successfully",
        status: "success",
      });
    } catch (err) {
      toast({
        title: "error",
        description: err.message,
        status: "error",
      });
    }
  };
  return (
    <Box
      boxShadow="lg"
      w="100%"
      maxW="600px"
      p="6"
      bg="white"
      borderRadius="md"
      {...rest}
    >
      <CenteredTextWithLines p="3" size="lg" mb="4" textAlign="center">
        <Heading size="lg">Register</Heading>
      </CenteredTextWithLines>
      <VStack spacing="4">
        <InputElement
          size="lg"
          register={register}
          Icon={FaUser}
          name="username"
          placeholder="username"
          errors={errors}
        />
        <InputElement
          size="lg"
          register={register}
          Icon={MdEmail}
          name="email"
          placeholder="email"
          errors={errors}
        />
        <InputElement
          size="lg"
          register={register}
          Icon={MdPhone}
          name="phoneNumber"
          placeholder="phone number"
          errors={errors}
          type="number"
        />
        <Flex w="100%" gap="3">
          <InputElement
            size="lg"
            name="locationAddress"
            Icon={MdGpsFixed}
            errors={errors}
            register={register}
            placeholder="Location Address"
          />
          <InputElement
            size="lg"
            name="locationPostCode"
            Icon={FaMapLocationDot}
            errors={errors}
            register={register}
            placeholder="Post Code"
            containerStyles={{
              w: "250px",
            }}
          />
        </Flex>

        <PasswordInput
          size="lg"
          variant="filled"
          placeholder="password"
          {...register("password")}
        />
        <ErrorText mr="auto">{errors?.password?.message}</ErrorText>
        <PasswordInput
          size="lg"
          variant="filled"
          placeholder="confirm password"
          {...register("confirmPassword")}
        />
        <ErrorText mr="auto">{errors?.password?.message}</ErrorText>

        <Button
          isLoading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          colorScheme="blackAlpha"
          variant="outline"
          width="full"
        >
          Create Account
        </Button>

        <CenteredTextWithLines>
          <Box>
            <Button as={Link} to="/login" variant="link">
              Have Account Already Click Here
            </Button>
          </Box>
        </CenteredTextWithLines>
      </VStack>
    </Box>
  );
};

export default RegisterBox;
