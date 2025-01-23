import React from "react";
import axios from "axios";

const SendSMSAdmin = async ({ title, fname, sname, mobile }) => {
  //console.log("SendSMSAdmin", title, fname, sname, mobile);
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
            "Dear Admin, " +
            " " +
            title +
            " " +
            fname +
            " " +
            sname +
            " " +
            `\nRequesting cleaning estimate. \nIf he/she didn’t hear from you after 7 hours he/she will contact you\n` +
            `Many thanks\n` +
            `Magic Hand ltd`,
          sender_id: 14183,
        },
      })
      .then((response) => {
        //alert("SMS sent successfully");
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

export default SendSMSAdmin;
