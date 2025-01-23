import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { FaUser } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { InputElement } from "../../../../Components/Common/InputElement/InputElement";
import { Select } from "@chakra-ui/react";
import { ErrorText } from "../../../../Components/Common/ErrorText/ErrorText";
import { CenteredTextWithLines } from "../../../../Components/Common/CenteredTextWithLines/CenteredTextWithLines";
import { Link } from "react-router-dom";
import { useUserData } from "../../../../Context/UserDataProvider/UserDataPRovider";
export const UserInformation = ({ register, errors }) => {
  const { user } = useUserData();
  return (
    <>
      <Flex gap="3">
        <Stack w="sm">
          <Select variant="filled" placeholder="Title" {...register("title")}>
            <option value="Miss">Miss</option>
            <option value="MR">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
          </Select>
          <ErrorText>{errors?.title?.message}</ErrorText>
        </Stack>

        <InputElement
          placeholder="First Name"
          name="firstName"
          Icon={FaUser}
          errors={errors}
          register={register}
        />
        <InputElement
          placeholder="Last Name"
          name="lastName"
          Icon={FaUser}
          errors={errors}
          register={register}
        />
      </Flex>
      <InputElement
        placeholder="Email"
        name="email"
        Icon={MdOutlineAlternateEmail}
        errors={errors}
        register={register}
      />
      <InputElement
        name="phoneNumber"
        placeholder="phone number"
        Icon={MdOutlineAlternateEmail}
        errors={errors}
        register={register}
      />
      {!user.data && (
        <CenteredTextWithLines>
          <Box>
            <Button as={Link} to="/login" variant="link">
              Have Account Already Click Here
            </Button>
          </Box>
        </CenteredTextWithLines>
      )}
    </>
  );
};
