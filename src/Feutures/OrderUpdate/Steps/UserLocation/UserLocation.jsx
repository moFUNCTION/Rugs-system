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
export const UserLocation = ({ register, errors, control }) => {
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
          readOnly
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
          readOnly
        />
      </Flex>

      {isSameRugCollectionAddress === "No" && (
        <Flex gap="3">
          <InputElement
            name="RugReturnAddress"
            Icon={MdGpsFixed}
            errors={errors}
            register={register}
            placeholder="Rug Return Address"
            readOnly
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
            readOnly
          />
        </Flex>
      )}

      <RadioGroup value={isSameRugCollectionAddress} defaultValue="Yes">
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
    </>
  );
};
