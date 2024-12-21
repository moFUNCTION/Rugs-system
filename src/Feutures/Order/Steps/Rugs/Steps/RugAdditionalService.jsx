import { useState } from "react";
import { MultiSelect } from "chakra-multiselect";
import { useWatch } from "react-hook-form";

export const RugAdditionalService = ({ setValue, control }) => {
  const selectedAdditionalServices = useWatch({
    control,
    name: "AdditionalServices",
  });

  const options = [
    { label: "Anti-slip rug underlay and free fitting", value: "antiSlip" },
    {
      label:
        "Rug uplifting and furniture moving on collection and/or return delivery",
      value: "rugUplifting",
    },
  ];

  return (
    <MultiSelect
      options={options}
      className="multi-select"
      label="choose the additional service your rug needs..."
      value={selectedAdditionalServices}
      onChange={(values) => setValue("AdditionalServices", values)}
      placeholder="Select"
      overflow="hidden"
    />
  );
};
