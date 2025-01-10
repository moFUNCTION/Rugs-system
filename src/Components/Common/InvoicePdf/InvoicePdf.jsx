import React from "react";
import { useState, useEffect } from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import headerImage from "../../../Assets/Header/header.png";
import footerImage from "../../../Assets/Footer/footer.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    size: "A4",
    width: "100%",
    height: "100%",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30, // Adjust based on your needs
    left: 0,
    right: 0,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
    flexGrow: 1,
  },
  header: {
    margin: 5,
  },
  footer: {
    marginBottom: 5,
    marginTop: 50,
    textAlign: "center",
  },
  image: {
    width: "100%", // Adjust as needed
    marginVertical: 1,
  },
  invoiceDetails: {
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 1,
    paddingBottom: 3,
    fontSize: 10,
    color: "#b81918",
    flexDirection: "row",
    justifyContent: "space-between",
    // Adjust the styling as needed
  },
  customerDetails: {
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 9,
    color: "000000",
    fontStyle: "bold",
    gap: 3,
    border: "0.5px solid #000",
    // Adjust the styling as needed
  },
  rugDetails: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 7,

    fontSize: 9,
    color: "000000",
    fontStyle: "bold",
    gap: 3,
    border: "0.5px solid #000",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Adjust as needed for your layout
  },
  detailRowRug: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: "row",
    justifyContent: "space-between", // Adjust as needed for your layout
    //border: "0.5px solid #000",
  },
  detailColumn: {
    flexDirection: "column",
  },
  RightColumn: {
    flexDirection: "column",
    textAlign: "center",
    borderLeft: "0.5px solid #000",
  },
  RightColumn: {
    flexDirection: "column",
    textAlign: "center",
    borderLeft: "0.5px solid #000",
  },
  detailTextAddressD: {
    fontSize: 9,
    color: "#3964db",
  },
  rugWorksText: {
    fontSize: 10,
    fontStyle: "bold",
  },
  table: {
    flexDirection: "row",
    width: "100%",
    //borderBottomWidth: 1,
    //borderColor: "#000", // Adjust the border color as needed
    //borderStyle: "solid",
  },
  leftColumn: {
    width: "90%", // Left column takes up 80% of the table width
    borderRightWidth: "0.5px", // Border between columns
    //borderBottomWidth: 0.5, // Border between columns

    padding: 5, // Adjust padding as needed
  },
  rightColumn: {
    width: "10%", // Right column takes up 20% of the table width
    padding: 5, // Adjust padding as needed
    textAlign: "right",
    //borderBottomWidth: 0.5,
  },
  leftColumnFD: {
    width: "90%", // Left column takes up 80% of the table width
    borderRightWidth: "0.5px", // Border between columns
    //borderBottomWidth: 0.5, // Border between columns

    padding: 5, // Adjust padding as needed
  },
  rightColumnFD: {
    width: "10%", // Right column takes up 20% of the table width
    padding: 5, // Adjust padding as needed
    textAlign: "right",
    //borderBottomWidth: 0.5,
  },
  leftColumnFDL: {
    width: "90%", // Left column takes up 80% of the table width
    borderRightWidth: "0.5px", // Border between columns
    //borderBottomWidth: 0.5, // Border between columns
    borderTopWidth: 0.5, // Border between columns
    padding: 5, // Adjust padding as needed
  },
  rightColumnFDL: {
    width: "10%", // Right column takes up 20% of the table width
    padding: 5, // Adjust padding as needed
    textAlign: "right",
    borderTopWidth: 0.5, // Border between columns
  },
  rightColumnFDLB: {
    width: "28%", // Right column takes up 20% of the table width
    borderTopWidth: 0.5, // Border between columns
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rightColumnFDLBL: {
    width: "64%", // Right column takes up 20% of the table width
    textAlign: "right",
    flexDirection: "column",
  },

  rightColumnFDLBLF: {
    padding: 5,
    borderBottomWidth: 0.5,
  },
  rightColumnFDLBLTh: {
    padding: 5,
  },
  rightColumnFDLBRF: {
    padding: 5.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
  },
  rightColumnFDLBRTh: {
    padding: 5.5,
    borderLeftWidth: 0.5,
  },

  cellTextPriceBL: { fontSize: 10, fontStyle: "bold" },
  cellTextPriceBR: { fontSize: 9 },
  rightColumnFDLBR: {
    width: "36%", // Right column takes up 20% of the table width
    textAlign: "right",
    flexDirection: "column",
  },
  leftColumnFDLB: {
    width: "72%", // Left column takes up 80% of the table width
    borderRightWidth: "0.5px", // Border between columns
    //borderBottomWidth: 0.5, // Border between columns
    borderTopWidth: 0.5, // Border between columns
    padding: 5, // Adjust padding as needed
    backgroundColor: "#ebeaea",
  },
  rightColumnRUG: {
    width: "10%", // Right column takes up 20% of the table width
    padding: 5, // Adjust padding as needed
    textAlign: "right",
    //borderRightWidth: 0.5, // Border between columns
    borderTopWidth: 0.5, // Border between columns
    borderBottomWidth: 0.5, // Border between columns
    borderColor: "#000", // Adjust the border color as needed
    borderStyle: "solid",
    backgroundColor: "#ebeaea",
  },
  leftColumnRUG: {
    width: "90%", // Left column takes up 80% of the table width
    borderRightWidth: 0.5, // Border between columns
    borderTopWidth: 0.5, // Border between columns
    borderBottomWidth: 0.5, // Border between columns
    borderColor: "#000", // Adjust the border color as needed
    borderStyle: "solid",
    padding: 5, // Adjust padding as needed
    backgroundColor: "#ebeaea",
  },
  CenterColumn: {
    width: "10%", // Right column takes up 20% of the table width
    padding: 5, // Adjust padding as needed
    textAlign: "center",
    //borderBottomWidth: 0.5,
  },
  row: {
    flexDirection: "row",
  },
  cellText: {
    fontSize: 10, // Adjust the font size as needed
  },
  cellTextPrice: {
    fontSize: 9, // Adjust the font size as needed
    textAlign: "right",
  },
  ccellTextRug: {
    fontSize: 9,
    fontStyle: "bold",
  },

  cellTextB: {
    fontSize: 10,
    fontStyle: "bold",
  },
  cellTextP: {
    fontSize: 9,
    fontStyle: "bold",
    textAlign: "center",
  },
  cellTextRug: {
    fontSize: 10,
    fontStyle: "bold",
  },
  cellTextRugN: {
    fontSize: 9,
  },
  cellTextRugNBF: {
    fontSize: 9,
    textAlign: "center",
    marginTop: 3,
  },
  cellTextRugNBFP: {
    fontSize: 9,
    textAlign: "center",
    color: "#b81918",
    marginTop: 5,
  },

  cellTextRugNG: {
    fontSize: 10,
    fontStyle: "bold",
  },
  CTextBl: {
    color: "#3964db",
  },
});

export const InvoicePDF = ({ data, isInvoice = true }) => {
  console.log(data);
  if (!data) {
    return <div>Loading...</div>;
  } else {
    return (
      <Document>
        <Page size="A4" title={`MH${data.userId}`} style={styles.page} wrap>
          <View style={styles.header}>
            <Image src={footerImage} style={styles.image} />
          </View>
          <View style={styles.invoiceDetails}>
            {isInvoice ? (
              <Text>INVOICE | MH {data.invoiceNo}</Text>
            ) : (
              <Text>RECEIPT | MH {data.receiptNo}</Text>
            )}

            <Text>CUSTOMER REF.</Text>
            <Text>DATE: {new Date().toLocaleDateString()}</Text>
          </View>
          <View style={styles.customerDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailText}>Customer: {data.username}</Text>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.detailColumn}>
                <Text style={styles.detailText}>
                  Rug Collection Address: {data.RugCollectionAddress}
                </Text>
              </View>
              <View style={styles.detailColumn}>
                <Text style={styles.detailText}>
                  Post Code: {data.RugCollectionAddressPostCode}
                </Text>
              </View>
            </View>
            {data.RugReturnAddress && data.RugReturnAddressPostCode && (
              <View style={styles.detailRow}>
                <View style={styles.detailColumn}>
                  <Text style={styles.detailTextAddressD}>
                    Return Address: {data.RugReturnAddress}
                  </Text>
                </View>
                <View style={styles.detailColumn}>
                  <Text style={styles.detailTextAddressD}>
                    Post Code: {data.RugReturnAddressPostCode}
                  </Text>
                </View>
              </View>
            )}
            <View style={styles.detailRow}>
              <Text style={styles.detailText}>
                Tel/Mobile: {data.phoneNumber} {"    "} Email: {data.email}
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.rugDetails}>
              <View style={styles.tableContainer}>
                <View style={styles.row}>
                  <View style={styles.leftColumn}>
                    <Text style={styles.cellTextRug}>RUG WORKS & SERVICES</Text>
                  </View>
                  <View style={styles.CenterColumn}>
                    <Text style={styles.cellTextP}>£</Text>
                  </View>
                </View>
                {data?.RugsUploaded &&
                  data.RugsUploaded?.map((rug, rugIndex) => (
                    <React.Fragment key={rugIndex}>
                      <View style={styles.row}>
                        <View style={styles.leftColumnRUG}>
                          <Text style={styles.cellTextRug}>
                            RUG: {rugIndex + 1}
                          </Text>
                        </View>
                        <View style={styles.rightColumnRUG}>
                          <Text style={styles.cellText}></Text>
                        </View>
                      </View>
                      <View style={styles.row}>
                        <View style={styles.leftColumn}>
                          <Text style={styles.cellTextRugNG}>
                            {rug.RugCleaningOption.name}
                          </Text>
                        </View>
                        <View style={styles.CenterColumn}>
                          <Text style={styles.cellTextPrice}>
                            {(
                              rug.length *
                              rug.width *
                              (rug.RugCleaningOption.price || 0)
                            ).toFixed(2)}
                          </Text>
                        </View>
                      </View>
                      {rug.RugCleaningOption?.Treatment?.length > 0 && (
                        <React.Fragment>
                          <View style={styles.row}>
                            <View style={styles.leftColumn}>
                              <Text style={styles.cellTextRugN}>TREATMENT</Text>
                            </View>
                            <View style={styles.CenterColumn}>
                              <Text style={styles.cellTextPrice}></Text>
                            </View>
                          </View>
                          {rug.RugCleaningOption.Treatment.map(
                            (treat, treatIndex) => (
                              <View
                                style={styles.row}
                                key={`treat-${rugIndex}-${treatIndex}`}
                              >
                                <View style={styles.leftColumn}>
                                  <Text style={styles.cellTextRugN}>
                                    {treat.value}
                                  </Text>
                                </View>
                                <View style={styles.CenterColumn}>
                                  <Text style={styles.cellTextPrice}>
                                    {treat.price.toFixed(2)}
                                  </Text>
                                </View>
                              </View>
                            )
                          )}
                        </React.Fragment>
                      )}
                      {rug.AdditionalServices?.length > 0 && (
                        <React.Fragment>
                          <View style={styles.row}>
                            <View style={styles.leftColumn}>
                              <Text style={styles.cellTextRugN}>SERVICES</Text>
                            </View>
                            <View style={styles.CenterColumn}>
                              <Text style={styles.cellTextPrice}></Text>
                            </View>
                          </View>
                          {rug.AdditionalServices.map(
                            (service, serviceIndex) => (
                              <View
                                style={styles.row}
                                key={`service-${rugIndex}-${serviceIndex}`}
                              >
                                <View style={styles.leftColumn}>
                                  <Text style={styles.cellTextRugN}>
                                    {service.label}
                                  </Text>
                                </View>
                                <View style={styles.CenterColumn}>
                                  <Text style={styles.cellTextPrice}>
                                    {service.price.toFixed(2)}
                                  </Text>
                                </View>
                              </View>
                            )
                          )}
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  ))}
                <View style={styles.row}>
                  <View style={styles.leftColumnFDL}>
                    <Text style={styles.cellTextRugN}>
                      Rug Collection and Return Delivery Service Charge
                    </Text>
                  </View>
                  <View style={styles.rightColumnFDL}>
                    <Text style={styles.cellTextPrice}>FREE</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.leftColumnFDLB}>
                    <Text style={styles.cellTextRugNBF}>TOTAL TO PAY</Text>
                  </View>
                  <View style={styles.rightColumnFDLB}>
                    <Text style={styles.cellTextPriceBR}>
                      {data.totalPrice}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View fixed style={styles.footer}>
            <Image src={footerImage} style={styles.image} />
          </View>
        </Page>
      </Document>
    );
  }
};
