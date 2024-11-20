import { Flex, Select, Stack, useMediaQuery } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { InputElement } from "../../../../../Components/Common/InputElement/InputElement";
import { MdOfflineBolt } from "react-icons/md";
import { ErrorText } from "../../../../../Components/Common/ErrorText/ErrorText";
import { RxWidth } from "react-icons/rx";
export const RugPropertiesStep = ({ register, errors }) => {
  const [isPhoneQuery] = useMediaQuery("(max-width: 900px)");
  const RugCarpetTypeOptions = [
    "all wool/all mohair/all cotton",
    "wool & silk mix/artificial silk mix/bamboo & silk mix",
    "all silk/all bamboo silk/all artificial silk",
    "not sure? - upload your rug info and images in the boxes below",
  ];

  return (
    <>
      <Flex wrap={isPhoneQuery && "wrap"} gap="3">
        <Stack w="150px" flexShrink="0" flexGrow={1}>
          <Select
            isDisabled
            variant="filled"
            placeholder="unit selector"
            {...register("UnitSelector")}
            readOnly
          >
            <option value="cms">cms</option>
            <option value="inches">inches</option>
          </Select>
          <ErrorText>{errors?.UnitSelector?.message}</ErrorText>
        </Stack>

        <InputElement
          name="length"
          placeholder="length"
          Icon={RxWidth}
          errors={errors}
          register={register}
          type="number"
          readOnly
        />
        <InputElement
          name="width"
          placeholder="width"
          Icon={RxWidth}
          errors={errors}
          register={register}
          type="number"
          readOnly
        />
      </Flex>
      <Stack borderRadius="md" bgColor="gray.50" p="3">
        <Text ml="1">What is your rug/oriental carpet type?</Text>
        <Select
          isDisabled
          {...register("RugMaterial")}
          flexShrink="0"
          variant="filled"
          w="100%"
          placeholder="select"
        >
          {RugCarpetTypeOptions.map((value) => {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </Select>
        <ErrorText>{errors?.RugMaterial?.message}</ErrorText>
      </Stack>
    </>
  );
};
