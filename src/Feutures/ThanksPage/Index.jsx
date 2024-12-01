import { useEffect } from "react";

import Cookies from "js-cookie";

export function Index() {
  return (
    <>
      <div
        id="start"
        className="flex flex-col justify-center h-[219.81px] pt-[14px] pb-[25px] px-2"
      >
        <span
          className=" font-serif text-[22px] sm:text-[26px] mb-8"
          style={{ color: "black" }}
        >
          Thank You {Cookies.get("customer")}...
        </span>
        <span className="text-bordertop font-serif text-center text-[14px] sm:text-[18px]">
          for verifying your rug cleaning/corrective treatments works request.
        </span>
        <span className="text-bordertop font-serif text-center text-[14px] sm:text-[18px]">
          We will process your request.
        </span>
      </div>
    </>
  );
}
