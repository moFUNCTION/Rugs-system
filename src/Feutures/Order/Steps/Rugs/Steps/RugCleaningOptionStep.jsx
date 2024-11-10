import { Checkbox, Radio, RadioGroup, Stack, Textarea } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useFieldArray, useWatch } from "react-hook-form";
import { MultiImageUploader } from "../../../../../Components/Common/MultiImagesUploader/MultiImagesUploader";
import { ErrorText } from "../../../../../Components/Common/ErrorText/ErrorText";
const CleaningOption = ({
  name,
  isSelected,
  containTreatment,
  treatments: TreatmentsValues,
  containImagesUpload,
  containRugImagesDescription,
  text,
  onChooseTreatment,
  onRemoveTreatment,
  TreatmentsSelected,
  onChangeRugImagesSelected,
  onRemoveRugImage,
  onRemoveAllRugImages,
  RugImagesUploaded,
  register,
  errors,
}) => {
  return (
    <Stack borderRadius="lg" key={name} p="3" bgColor="gray.100">
      <Radio value={name}>{name}</Radio>
      {isSelected && (
        <Stack bgColor="gray.200" p="3" borderRadius="lg">
          {containTreatment && (
            <Stack>
              <Text textTransform="capitalize">
                choose the treatments you want
              </Text>
              <ErrorText>
                {errors?.RugCleaningOption?.Treatment?.message}
              </ErrorText>
              {TreatmentsValues?.map((treatment) => {
                return (
                  <Checkbox
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChooseTreatment(treatment);
                      } else {
                        onRemoveTreatment(treatment);
                      }
                    }}
                    isChecked={TreatmentsSelected?.find((treatmentSelected) => {
                      return treatmentSelected.value === treatment;
                    })}
                    p="2"
                    borderRadius="md"
                    bgColor="white"
                    key={treatment}
                  >
                    {treatment}
                  </Checkbox>
                );
              })}
            </Stack>
          )}
          {containImagesUpload && (
            <>
              <ErrorText>
                {errors?.RugCleaningOption?.RugImages?.message}
              </ErrorText>
              <MultiImageUploader
                onChange={onChangeRugImagesSelected}
                onRemoveItem={onRemoveRugImage}
                onRemoveAllItems={onRemoveAllRugImages}
                addingTitle="add rug photos"
                isLoaded
                images={RugImagesUploaded}
              />
            </>
          )}
          {containRugImagesDescription && (
            <Textarea
              bgColor="white"
              placeholder="add a comment to rug images"
              {...register("RugCleaningOption.RugImagesDescription")}
            />
          )}
          {text && (
            <Text
              bgColor="white"
              p="2"
              color="gray.600"
              border="2px"
              borderColor="gray.700"
              borderRadius="md"
            >
              {text}
            </Text>
          )}
        </Stack>
      )}
    </Stack>
  );
};
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
  const HandleAddTreatment = (value) => {
    if (
      !treatments.fields.find((treatment) => {
        return treatment.value === value;
      })
    ) {
      treatments.append({
        value,
      });
    }
  };
  const HandleRemoveTreatment = (value) => {
    treatments.replace(
      treatments?.fields.filter((treatment) => {
        return treatment.value !== value;
      })
    );
  };

  const RugImagesUploaded = useFieldArray({
    control,
    name: "RugCleaningOption.RugImages",
  });

  const HandleAddImage = (files) => {
    Array.from(files).forEach((file) => {
      RugImagesUploaded.append({
        value: file,
      });
    });
  };
  const HandleRemoveImage = ({ index }) => {
    RugImagesUploaded.remove(index);
  };
  const HandleRemoveAllImages = () => {
    RugImagesUploaded.replace([]);
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
                onRemoveTreatment={HandleRemoveTreatment}
                onChooseTreatment={HandleAddTreatment}
                onChangeRugImagesSelected={HandleAddImage}
                RugImagesUploaded={RugImagesUploaded.fields}
                TreatmentsSelected={treatments.fields}
                onRemoveRugImage={HandleRemoveImage}
                onRemoveAllRugImages={HandleRemoveAllImages}
                key={option.name}
                isSelected={isSelected}
                errors={errors}
                register={register}
                {...option}
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
