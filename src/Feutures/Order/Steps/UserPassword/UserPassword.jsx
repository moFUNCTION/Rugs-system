import React, { useEffect } from "react";
import { PasswordInput } from "../../../../Components/Common/PasswordInput/PasswordInput";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { CenteredTextWithLines } from "../../../../Components/Common/CenteredTextWithLines/CenteredTextWithLines";
import { ErrorText } from "../../../../Components/Common/ErrorText/ErrorText";
import { MdLock } from "react-icons/md";
import { useUserData } from "../../../../Context/UserDataProvider/UserDataPRovider";
import { Alert, AlertIcon } from "@chakra-ui/react";
export const UserPassword = ({ register, errors, setValue }) => {
  const { user } = useUserData();
  useEffect(() => {
    if (user.data) {
      setValue("password", user.data.uid);
      setValue("confirmPassword", user.data.uid);
    }
  }, [user.data]);
  console.log(errors);
  return (
    <>
      {user.data ? (
        <Alert status="success">
          <AlertIcon />
          All Your Orders Saved To Your Account
        </Alert>
      ) : (
        <>
          <CenteredTextWithLines borderRadius="lg">
            <Flex
              bgColor="gray.100"
              paddingInline="4"
              paddingBlock="1"
              borderRadius="full"
              flexShrink="0"
              alignItems="center"
              gap="3"
            >
              <MdLock />
              Sync Data And Orders With Your Account By Setting A password
            </Flex>
          </CenteredTextWithLines>
          <PasswordInput
            variant="filled"
            placeholder="password"
            {...register("password")}
          />
          <ErrorText>{errors?.password?.message}</ErrorText>
          <PasswordInput
            variant="filled"
            placeholder="confirmPassword"
            {...register("confirmPassword")}
          />
          <ErrorText>{errors?.confirmPassword?.message}</ErrorText>
        </>
      )}
    </>
  );
};
