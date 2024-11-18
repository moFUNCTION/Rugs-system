import React from "react";
import {
  Box,
  Button,
  Heading,
  VStack,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { InputElement } from "../../../Common/InputElement/InputElement";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../../../Common/PasswordInput/PasswordInput";
import { CenteredTextWithLines } from "../../../Common/CenteredTextWithLines/CenteredTextWithLines";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { SignUser } from "../../../../@Firebase/Utils/Auth/Login/Login";

const LoginBox = ({ ...rest }) => {
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
      const User_Login_Init = new SignUser(data);
      await User_Login_Init.onSign();
      toast({
        title: "login successfully",
        status: "success",
      });
    } catch (err) {
      toast({
        title: "error",
        description: err.code,
        status: "error",
      });
    }
  };
  return (
    <Box
      w="100%"
      maxW="600px"
      p="6"
      bg="white"
      boxShadow="lg"
      borderRadius="md"
      {...rest}
    >
      <CenteredTextWithLines p="3" size="lg" mb="4" textAlign="center">
        <Heading size="lg">Login</Heading>
      </CenteredTextWithLines>
      <VStack spacing="4">
        <InputElement
          register={register}
          Icon={MdEmail}
          name="email"
          placeholder="Email"
          errors={errors}
          size="lg"
        />

        <PasswordInput
          size="lg"
          variant="filled"
          placeholder="Password"
          {...register("password")}
        />

        <Button
          isLoading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          colorScheme="blackAlpha"
          variant="outline"
          width="full"
        >
          Login To Your Account
        </Button>

        <Divider />

        <CenteredTextWithLines>
          <Box>
            <Button as={Link} to="/register" variant="link">
              Dont Have An Account Click Here
            </Button>
          </Box>
        </CenteredTextWithLines>
      </VStack>
    </Box>
  );
};

export default LoginBox;
