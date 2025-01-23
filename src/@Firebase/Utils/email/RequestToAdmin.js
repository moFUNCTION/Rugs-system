import React from "react";
import emailjs from "@emailjs/browser";

const SendEmailAdmin = async ({ title, fname, sname }) => {
  try {
    const result = await emailjs.send(
      "service_q5uj2gw",
      "template_pc4lp4l",
      {
        button_link: `https://magichandapp.co.uk/admin/orders`,
        header: "Request has been accepted",
        subject: "Request has been Accepted from",
        to_email: "info@magichand.co.uk",
        title: title,
        f_name: fname,
        l_name: sname,
        from_name: "Magic Hand",
        message: `${title} ${fname} ${sname} new Request has been Accepted.
                            please go to the admin dashboard
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
                          <a
                            style="
                              text-decoration: none;
                              display: inline-block;
                              color: #ffffff;
                              background-color: #a8bf6f;
                              border-radius: 4px;
                              width: auto;
                              font-weight: 400;
                              padding-top: 15px;
                              padding-bottom: 15px;
                              font-family: Montserrat, Trebuchet MS,
                                Lucida Grande, Lucida Sans Unicode, Lucida Sans,
                                Tahoma, sans-serif;
                              text-align: center;
                              word-break: keep-all;
                              border: 1px solid #a8bf6f;
                            "
                            href="https://magichandapp.co.uk/admin"
                            target="_blank"
                            rel="noopener"
                            data-saferedirecturl="https://www.google.com/url?q=https://magichand.co.uk/my-account/&amp;source=gmail&amp;ust=1700749524076000&amp;usg=AOvVaw2lGJvLRjBd4ezQJdbkG6Z4"
                            ><span
                              style="
                                padding-left: 15px;
                                padding-right: 15px;
                                font-size: 16px;
                                display: inline-block;
                                letter-spacing: normal;
                              "
                              ><span
                                dir="ltr"
                                style="
                                  word-break: break-word;
                                  line-height: 32px;
                                "
                                >Cleaning Estimate</span
                              ></span
                            ></a
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

export default SendEmailAdmin;
