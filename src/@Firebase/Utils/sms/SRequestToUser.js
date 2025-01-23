import React from "react";
import axios from "axios";

const SendSMS = async ({ title, fname, sname, mobile }) => {
  console.log(mobile);
  //console.log("SendSMSUser", title, fname, sname, mobile);
  const applicationId = import.meta.env.VITE_BULKGATE_APP_ID;
  const applicationToken = import.meta.env.VITE_BULKGATE_APP_TOKEN;
  try {
    const result = await axios
      .get("https://portal.bulkgate.com/api/1.0/simple/promotional", {
        params: {
          application_id: applicationId,
          application_token: applicationToken,
          number: mobile,
          text:
            "Dear" +
            " " +
            title +
            " " +
            fname +
            " " +
            sname +
            ", " +
            `\nThank you for submitting your Rug Works and Services Estimate request. We will get back to you within 7 hours max. If you do not receive any notification from us within this time, please contact us.\n` +
            `Many thanks.\n` +
            `Magic Hand Ltd\n` +
            `T: 02088003377`,
          sender_id: 14183,
        },
      })
      .then((response) => {
        //alert("SMS sent successfully");
        console.log("SMS sent successfully", response);
      })
      .catch((error) => {
        console.error(error);
      });
    return true;
  } catch (error) {
    console.error("Failed to send SMS", error);
    return false;
  }
};

export default SendSMS;
