import {
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdGpsFixed } from "react-icons/md";
import { InputElement } from "../../../../Components/Common/InputElement/InputElement";
import { useWatch } from "react-hook-form";
import { FaMapLocationDot } from "react-icons/fa6";
export const UserLocation = ({ register, errors, control, setValue }) => {
  const isSameRugCollectionAddress = useWatch({
    control,
    name: "isSameRugCollectionAddress",
  });
  console.log(errors);
  return (
    <>
      <Flex gap="3">
        <InputElement
          name="RugCollectionAddress"
          Icon={MdGpsFixed}
          errors={errors}
          register={register}
          placeholder="Rug Collection Address"
        />
        <InputElement
          name="RugCollectionAddressPostCode"
          Icon={FaMapLocationDot}
          errors={errors}
          register={register}
          placeholder="Post Code"
          containerStyles={{
            w: "250px",
          }}
        />
      </Flex>

      <RadioGroup
        value={isSameRugCollectionAddress}
        onChange={(value) => {
          setValue("isSameRugCollectionAddress", value);
        }}
        defaultValue="Yes"
      >
        <Flex
          borderRadius="md"
          bgColor="gray.50"
          p="2"
          alignItems="center"
          gap="3"
        >
          Is the Rug Return Delivery Address the same as above?
          <Flex gap="3">
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Flex>
        </Flex>
      </RadioGroup>
      {isSameRugCollectionAddress === "No" && (
        <Flex gap="3">
          <InputElement
            name="RugReturnAddress"
            Icon={MdGpsFixed}
            errors={errors}
            register={register}
            placeholder="Rug Return Address"
          />
          <InputElement
            name="RugReturnAddressPostCode"
            Icon={FaMapLocationDot}
            errors={errors}
            register={register}
            placeholder="Post Code"
            containerStyles={{
              w: "250px",
            }}
          />
        </Flex>
      )}
    </>
  );
};
