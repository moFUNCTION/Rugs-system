import { Flex } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { InputElement } from "../../../../Components/Common/InputElement/InputElement";

export const UserInformation = ({ register, errors }) => {
  return (
    <>
      <Flex gap="3">
        <InputElement
          name="username"
          Icon={FaUser}
          errors={errors}
          register={register}
          readOnly
        />
        <InputElement
          name="email"
          Icon={MdOutlineAlternateEmail}
          errors={errors}
          register={register}
          readOnly
        />
      </Flex>

      <InputElement
        name="phoneNumber"
        placeholder="phone number"
        Icon={MdOutlineAlternateEmail}
        errors={errors}
        register={register}
        type="number"
        readOnly
      />
    </>
  );
};
