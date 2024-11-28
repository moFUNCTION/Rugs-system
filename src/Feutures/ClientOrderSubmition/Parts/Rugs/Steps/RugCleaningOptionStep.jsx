import React, { useCallback } from "react";
import {
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Text,
  Flex,
  Input,
} from "@chakra-ui/react";
import { useFieldArray, useWatch } from "react-hook-form";
import { MultiImageUploader } from "../../../../../Components/Common/MultiImagesUploader/MultiImagesUploader";
import { ErrorText } from "../../../../../Components/Common/ErrorText/ErrorText";
import { CenteredTextWithLines } from "../../../../../Components/Common/CenteredTextWithLines/CenteredTextWithLines";

const TreatmentOptions = ({
  treatments,
  onChooseTreatment,
  onRemoveTreatment,
  selectedTreatments,
  error,
  register,
}) => (
  <Stack>
    <Text textTransform="capitalize">Choose the treatments you want</Text>
    <ErrorText>{error}</ErrorText>
    {treatments?.map((treatment) => {
      const TreatmentSelected = selectedTreatments.find(
        (selected) => selected.value === treatment
      );

      return (
        <Flex
          p="2"
          borderRadius="md"
          bgColor="white"
          alignItems="center"
          gap="6"
          key={treatment}
        >
          <Checkbox
            flexShrink="0"
            onChange={(e) => {
              if (e.target.checked) {
                onChooseTreatment(treatment);
              } else {
                onRemoveTreatment(treatment);
              }
            }}
            isChecked={TreatmentSelected}
          >
            {treatment}
          </Checkbox>
          {TreatmentSelected && TreatmentSelected.price && (
            <Text
              bgColor="green.500"
              paddingInline="3"
              paddingBlock="1"
              color="white"
              borderRadius="lg"
            >
              Price :{TreatmentSelected?.price}
            </Text>
          )}
        </Flex>
      );
    })}
  </Stack>
);

const ImageUploaderSection = ({
  title,
  images,
  onChange,
  onRemoveItem,
  onRemoveAllItems,
  error,
}) => (
  <Stack bgColor="white" p="3" borderRadius="lg">
    <CenteredTextWithLines>
      <Text flexShrink="0">{title}</Text>
    </CenteredTextWithLines>
    {error && <ErrorText>{error}</ErrorText>}
    <MultiImageUploader
      onChange={onChange}
      onRemoveItem={onRemoveItem}
      onRemoveAllItems={onRemoveAllItems}
      addingTitle="Add Photos"
      isLoaded
      images={images}
      readOnly
    />
  </Stack>
);

const CleaningOption = ({
  option,
  isSelected,
  onChooseTreatment,
  onRemoveTreatment,
  selectedTreatments,
  onChangeImages,
  uploadedImages,
  onRemoveImage,
  onRemoveAllImages,
  onChangeReceivedImages,
  receivedImages,
  onRemoveReceivedImage,
  onRemoveAllReceivedImages,
  register,
  errors,
}) => (
  <Stack borderRadius="lg" key={option.name} p="3" bgColor="gray.100">
    <Flex alignItems="center" gap="4">
      <Radio value={option.name}>{option.name}</Radio>
      {isSelected && (
        <Input
          type="number"
          {...register("RugCleaningOption.price", {
            valueAsNumber: true,
          })}
          bgColor="white"
          placeholder="price"
          readOnly={true}
        />
      )}
    </Flex>
    {isSelected && (
      <Stack bgColor="gray.200" p="3" borderRadius="lg">
        {option.containTreatment && (
          <TreatmentOptions
            treatments={option.treatments}
            onChooseTreatment={onChooseTreatment}
            onRemoveTreatment={onRemoveTreatment}
            selectedTreatments={selectedTreatments}
            error={errors?.RugCleaningOption?.Treatment?.message}
            register={register}
          />
        )}
        {option.containImagesUpload && (
          <>
            <ImageUploaderSection
              title="Rugs Images Uploaded By Client"
              images={uploadedImages}
              onChange={onChangeImages}
              onRemoveItem={onRemoveImage}
              onRemoveAllItems={onRemoveAllImages}
              error={errors?.RugCleaningOption?.RugImages?.message}
            />
            <ImageUploaderSection
              title="Upload Photos of Rug Received"
              images={receivedImages}
              onRemoveItem={onRemoveReceivedImage}
              onRemoveAllItems={onRemoveAllReceivedImages}
              onChange={onChangeReceivedImages}
            />
          </>
        )}
        {option.containRugImagesDescription && (
          <Textarea
            bgColor="white"
            placeholder="Add a comment to rug images"
            {...register("RugCleaningOption.RugImagesDescription")}
          />
        )}
        {option.text && (
          <Text
            bgColor="white"
            p="2"
            color="gray.600"
            border="2px"
            borderColor="gray.700"
          >
            {option.text}
          </Text>
        )}
      </Stack>
    )}
  </Stack>
);

export const RugCleaningOptionStep = ({
  control,
  setValue,
  errors,
  register,
}) => {
  const RugCleaningOption = useWatch({ name: "RugCleaningOption", control });

  const treatments = useFieldArray({
    control,
    name: "RugCleaningOption.Treatment",
  });

  const RugImagesUploaded = useFieldArray({
    control,
    name: "RugCleaningOption.RugImages",
  });

  const RugReceivedImagesUploaded = useFieldArray({
    control,
    name: "RugCleaningOption.RugReceivedImages",
  });

  const handleAddTreatment = (value) =>
    !treatments.fields.find((treatment) => treatment.value === value) &&
    treatments.append({ value });

  const handleRemoveTreatment = (value) =>
    treatments.replace(
      treatments.fields.filter((treatment) => treatment.value !== value)
    );

  const handleAddImage = (files, appendFunction) => {
    Array.from(files).forEach((file) => {
      appendFunction({ value: file });
    });
  };

  return (
    <>
      <Text>Choose one of the following Rug Cleaning options below...</Text>
      <RadioGroup
        value={RugCleaningOption?.name}
        onChange={(value) => setValue("RugCleaningOption.name", value)}
      >
        <Stack gap="3">
          <ErrorText>{errors?.RugCleaningOption?.name?.message}</ErrorText>
          {RugOptions.map((option) => {
            const isSelected = RugCleaningOption?.name === option.name;
            return (
              <CleaningOption
                key={option.name}
                option={option}
                isSelected={isSelected}
                onChooseTreatment={handleAddTreatment}
                onRemoveTreatment={handleRemoveTreatment}
                selectedTreatments={treatments.fields}
                onChangeImages={(files) =>
                  handleAddImage(files, RugImagesUploaded.append)
                }
                uploadedImages={RugImagesUploaded.fields}
                onRemoveImage={RugImagesUploaded.remove}
                onRemoveAllImages={() => RugImagesUploaded.replace([])}
                onChangeReceivedImages={(files) =>
                  handleAddImage(files, RugReceivedImagesUploaded.append)
                }
                receivedImages={RugReceivedImagesUploaded.fields}
                onRemoveReceivedImage={RugReceivedImagesUploaded.remove}
                onRemoveAllReceivedImages={() =>
                  RugReceivedImagesUploaded.replace([])
                }
                register={register}
                errors={errors}
              />
            );
          })}
        </Stack>
      </RadioGroup>
    </>
  );
};

const RugOptions = [
  {
    name: "General (Deep Wash) Rug Cleaning Works ONLY",
    containRugImagesDescription: false,
    containTreatment: false,
    containImagesUpload: false,
    text: `This option includes:
  FREE moth protection spray after cleaning
  FREE collection and return delivery
  FREE flea/carpet beetle protection spray after cleaning
  FREE Scotch Guard stain protection spray after cleaning if requested by customer
  FREE protective waterproof plastic covering on returned item(s)`,
  },
  {
    name: "Deep Wash Rug Cleaning and tick one or more Stain Treatments | Repairs or Restoration works | Alteration works",
    containRugImagesDescription: true,
    containTreatment: true,
    containImagesUpload: true,
    text: `This option includes:
  FREE moth protection spray after cleaning
  FREE collection and return delivery
  FREE flea/carpet beetle protection spray after cleaning
  FREE Scotch Guard stain protection spray after cleaning if requested by customer
  FREE protective waterproof plastic covering on returned item(s)`,
    treatments: [
      "Food and drink spills/stains",
      "Colour run/bleeding",
      "Pet soilage/vomit/urine & odours",
      "Red wine spills/stains",
      "Baby soilage/vomit/urine & odours",
      "Melted wax or encrusted mud",
      "Blood/grass/lipstick/gum/adhesive stains",
      "Ink/shoe polish stains",
      "Soot/ash marks and smokey odour",
      "Flood water/mould/damp damage",
      "Repairs / Restoration",
      "Alteration",
    ],
  },
  {
    name: "Rug Repairs and Restoration Works ONLY",
    containRugImagesDescription: true,
    containTreatment: false,
    containImagesUpload: true,
    text: `
  This option includes:
  FREE collection and return delivery
  FREE protective waterproof plastic covering on returned item(s)
        `,
    additionalText: `We undertake expert repairs for the following rug problems:
  
  • Fraying/Unravelling/Missing fringes, edges and corners
  
  • Pet-Chewed corners and edges
  
  • Holes, Splits, Rips and Tears
  
  • Threadbare and Pile Worn areas
  
  • Fire Damage: Burns/Singes/Charring
  
  • Tension: Rippled/Puckered/Uneven`,
  },
  {
    name: "Rug Alteration Works ONLY",
    containRugImagesDescription: true,
    containTreatment: false,
    containImagesUpload: true,
    text: `This option includes:
  FREE collection and return delivery
  FREE protective waterproof plastic covering on returned item(s)
  `,
    additionalText: `We undertake the following professional rug alterations:
  
  • Shortening and Narrowing
  
  • Bespoke Re-sizing and Re-shaping
  
  • Seamless Matching of colour, pattern and yarn
  
  • Finishing/Binding/Fringing
  
  • Original Labels and Trimmings re-applied
  
  • Rug and Tapestry Wall Hanging`,
  },
];
