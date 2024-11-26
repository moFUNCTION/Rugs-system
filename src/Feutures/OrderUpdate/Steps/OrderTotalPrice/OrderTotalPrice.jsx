import { Button, Stack } from "@chakra-ui/react";
import React from "react";
import { InvoicePDF } from "../../../../Components/Common/InvoicePdf/InvoicePdf";

export default function OrderTotalPrice({ data }) {
  return (
    <>
      <InvoicePDF data={data} />
      <Button colorScheme="green">Total Price : {data?.totalPrice} </Button>
    </>
  );
}
