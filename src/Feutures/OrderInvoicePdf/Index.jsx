import { PDFViewer } from "@react-pdf/renderer";
import React from "react";
import { InvoicePDF } from "../../Components/Common/InvoicePdf/InvoicePdf";
import { useParams } from "react-router-dom";
import { useGetDoc } from "../../@Firebase/Hooks/Common/useGetDoc/useGetDoc";
import { useGetCollectionWithPaginationInCursors } from "../../@Firebase/Hooks/Common/useCollectionWithPagination(Cursors)/useCollectionWithPagination(Cursors)";
import { Skeleton } from "@chakra-ui/react";

export default function Index() {
  const { id } = useParams();
  const { data, loading, error } = useGetDoc({
    __collection__: "Orders",
    docId: id,
  });
  const {
    data: RugsUploaded,
    loading: RugUploadedLoading,
    error: RugsUploadedError,
  } = useGetCollectionWithPaginationInCursors({
    __collection__: `Orders/${id}/RugsUploaded`,
    size: 30,
    orderByQueries: [],
  });
  const {
    data: DiscountData,
    loading: DiscountLoading,
    error: DiscountError,
  } = useGetDoc({
    __collection__: "Discounts",
    docId: data?.discount,
  });
  return (
    <Skeleton height="100vh" isLoaded={!RugUploadedLoading && !DiscountLoading}>
      <PDFViewer height="100%" width="100%">
        <InvoicePDF
          data={{
            ...data,
            RugsUploaded,
            discount: DiscountData?.discount,
          }}
        />
      </PDFViewer>
    </Skeleton>
  );
}
