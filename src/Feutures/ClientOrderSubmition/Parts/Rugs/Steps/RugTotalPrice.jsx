import React, { useMemo } from "react";
import { CenteredTextWithLines } from "../../../../../Components/Common/CenteredTextWithLines/CenteredTextWithLines";
import { useWatch } from "react-hook-form";
import { sumTotalPrice } from "../../../../../Utils/RugsTotalPrice/RugsTotalPrice";
import { Badge, Button, Text } from "@chakra-ui/react";
export const RugTotalPrice = ({ control }) => {
  const Rug = useWatch({ control });
  const TotalPrice = useMemo(() => {
    return sumTotalPrice([Rug]);
  }, [JSON.stringify(Rug)]);
  return (
    <>
      <CenteredTextWithLines>
        <Text display="flex" gap="3" alignItems="center" flexShrink="0">
          Rug Total Price is{" "}
          <Button size="sm" colorScheme="green">
            {TotalPrice}
          </Button>
        </Text>
      </CenteredTextWithLines>
      <Text m="0 auto" mt="3">
        Click Prev If you want to reUpdate the total Price
      </Text>
    </>
  );
};
