import {
  Checkbox,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdGpsFixed } from "react-icons/md";
import { InputElement } from "../../../../Components/Common/InputElement/InputElement";
import { useWatch } from "react-hook-form";
export const UserLocation = ({ register, errors, control, setValue }) => {
  const isSameRugCollectionAddress = useWatch({
    control,
    name: "isSameRugCollectionAddress",
  });

  return (
    <>
      <InputElement
        name="RugCollectionAddress"
        Icon={MdGpsFixed}
        errors={errors}
        register={register}
        placeholder="Rug Collection Address"
      />

      {!isSameRugCollectionAddress && (
        <InputElement
          name="RugReturnAddress"
          Icon={MdGpsFixed}
          errors={errors}
          register={register}
          placeholder="Rug Return Address"
        />
      )}

      <Checkbox
        isChecked={isSameRugCollectionAddress}
        onChange={(e) =>
          setValue("isSameRugCollectionAddress", e.target.checked)
        }
      >
        Is the Rug Return Delivery Address the same as above?
      </Checkbox>
    </>
  );
};
