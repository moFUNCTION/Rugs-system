import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useFieldArray, useWatch } from "react-hook-form";
import { TreatmentSelected } from "./Treatment";
import { sumTotalPrice } from "../../../../Utils/RugsTotalPrice/RugsTotalPrice";
import { AdditionalServicesSelected } from "./AditionalServices";
export const Rug = ({
  RugData,
  index,
  onDeleteTreatment,
  onDeleteService,
  id,
}) => {
  const { width, length, UnitSelector, RugCleaningOption, AdditionalServices } =
    RugData;
  return (
    <Stack
      alignItems="start"
      w="100%"
      border="2px"
      borderColor="gray.500"
      p="5"
      borderRadius="md"
      gap="3"
    >
      <Heading
        size="md"
        w="fit-content"
        p="3"
        border="5px gray solid"
        color="gray.600"
        borderRadius="md"
      >
        Rug No : {index + 1}
      </Heading>
      <Flex borderRadius="md" gap="5" border="1px" w="100%" p="3">
        <Text>
          Width : {width} {UnitSelector}
        </Text>
        <Text>
          Length : {length} {UnitSelector}
        </Text>
      </Flex>
      <Stack borderRadius="md" gap="5" border="1px" w="100%" p="3">
        <Text>{RugCleaningOption.name}</Text>
        {!isNaN(RugCleaningOption.price) && (
          <Text ml="auto">{RugCleaningOption.price} £ </Text>
        )}
      </Stack>

      <Stack borderRadius="md" gap="3" border="1px" w="100%" p="3">
        <Text>Needs Stain Treatments:</Text>
        {RugCleaningOption.Treatment?.map((treatment) => {
          return (
            <TreatmentSelected
              key={treatment.value}
              value={treatment?.value}
              price={treatment?.price}
              onDelete={() =>
                onDeleteTreatment({
                  RugIndex: index,
                  TreatmentValue: treatment.value,
                  RugId: id,
                })
              }
            />
          );
        })}
      </Stack>
      <Stack borderRadius="md" gap="3" border="1px" w="100%" p="3">
        <Text>Additional Services Selected</Text>
        {AdditionalServices?.map((service) => {
          return (
            <AdditionalServicesSelected
              key={service.value}
              label={service.label}
              value={service?.value}
              price={service?.price}
              onDelete={() =>
                onDeleteService({
                  RugIndex: index,
                  ServiceValue: service.value,
                  RugId: id,
                })
              }
            />
          );
        })}
      </Stack>
      {/* <Text borderRadius="md" gap="5" border="1px" w="100%" p="3">
        Total Price Of Rug : {sumTotalPrice([RugData])} £{" "}
      </Text> */}
    </Stack>
  );
};
