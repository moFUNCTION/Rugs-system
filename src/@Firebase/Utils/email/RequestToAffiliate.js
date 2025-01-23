import React from "react";
import emailjs from "@emailjs/browser";

const SendEmailToAffiliate = async (email) => {
  try {
    const result = await emailjs.send(
      "service_q5uj2gw",
      "template_pc4lp4l",
      {
        button_link: `https://magichandapp.co.uk/affiliate/`,
        header: "Affiliate Notification: Commission Amount update",
        subject: "Affiliate Notification: Commission Amount update",
        to_email: email,
        title: "Affiliate",
        f_name: "",
        l_name: "",
        from_name: "Magic Hand Ltd",
        message: `
                    <div style="padding: 10px; text-align: left;">
                    Good News!<br><br>Please Log-in to your <a href="https://magichandapp.co.uk/affiliate/"; target="_blank"; text-decoration: none;>‘The Magic Hand Affiliate Account’</a> to see the latest updated ‘Commission Amount due to Affiliate’.<br><br>
                    Meanwhile, we want to express our appreciation and let you know how much we enjoy working with you and your team members on this joint collaboration. We look forward to an upcoming year of business success in working together.<br>
                    <br>Kind regards,<br><br>
                    Magic Hand Ltd
                    </div>
                            </div>
                        
                        <div
                          style="padding: 25px 10px 10px 10px"
                          align="center"
                        >
                          
                          <table
                            style="
                              table-layout: fixed;
                              vertical-align: top;
                              border-spacing: 0;
                              border-collapse: collapse;
                              min-width: 100%;
                            "
                            role="presentation"
                            border="0"
                            width="100%"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tbody>
                              <tr style="vertical-align: top" valign="top">
                                <td
                                  style="
                                    word-break: break-word;
                                    vertical-align: top;
                                    min-width: 100%;
                                    padding: 30px 10px 10px 10px;
                                  "
                                  valign="top"
                                >
                                  <table
                                    style="
                                      table-layout: fixed;
                                      vertical-align: top;
                                      border-spacing: 0;
                                      border-collapse: collapse;
                                      border-top: 0px solid transparent;
                                      width: 100%;
                                    "
                                    role="presentation"
                                    border="0"
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    align="center"
                                  >
                                    <tbody>
                                      <tr
                                        style="vertical-align: top"
                                        valign="top"
                                      >
                                        <td
                                          style="
                                            word-break: break-word;
                                            vertical-align: top;
                                          "
                                          valign="top"
                                        >
                                          &nbsp;
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                            `,
        button: "Go to Quotes page",
        footer: "this is a footer",
      },
      "ZhFxwznqavgJ_Yif8"
    );
    return true;
  } catch (error) {
    console.error("Failed to send email", error);
    return false;
  }
};

export default SendEmailToAffiliate;
