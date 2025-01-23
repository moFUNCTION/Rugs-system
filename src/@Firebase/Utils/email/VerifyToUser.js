import React from "react";
import emailjs from "@emailjs/browser";

const VTUEmail = async (title, fname, sname, email) => {
  try {
    const result = await emailjs.send(
      "service_q5uj2gw",
      "template_pc4lp4l",
      {
        button_link: `https://magichandapp.co.uk/admin/orders`,
        header: "RThank-you message",
        subject: "Thank-you message",
        to_email: email,
        title: title,
        f_name: fname,
        l_name: sname,
        from_name: "Magic Hand",
        message: `
        <div style="padding: 25px 10px 10px 10px" align="center">
        Thank you for confirming the Rug Works and Services Estimate go ahead.
        <br>
        We are now in the process of booking one of your selected rug collection dates 
        <br>
        and will confirm with you shortly.  
         </div>
                            </div>
                        <div
                          style="
                            color: #555555;
                            font-family: Montserrat, Trebuchet MS, Lucida Grande,
                              Lucida Sans Unicode, Lucida Sans, Tahoma,
                              sans-serif;
                            line-height: 1.5;
                            padding: 10px;
                          "
                        >
                          <div
                            style="
                              font-size: 12px;
                              line-height: 1.5;
                              color: #555555;
                              font-family: Montserrat, Trebuchet MS,
                                Lucida Grande, Lucida Sans Unicode, Lucida Sans,
                                Tahoma, sans-serif;
                            "
                          >
                            <p
                              style="
                                margin: 0;
                                text-align: center;
                                line-height: 1.5;
                                word-break: break-word;
                                font-size: 16px;
                                margin-top: 0;
                                margin-bottom: 0;
                              "
                            >
                              <span style="font-size: 16px">
                              </span>
                            </p>
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

export default VTUEmail;
