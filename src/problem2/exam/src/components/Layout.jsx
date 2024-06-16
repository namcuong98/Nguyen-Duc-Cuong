import React from "react";
import CurrencySwap from "./CurrencySwap";

const Layout = () => {
  return (
    <>
      <div className="h-screen w-screen bg-gradient-to-tl to-[#313d5c] from-[#3b2e56] flex justify-center items-center">
        <div className=" h-[560px] w-[300px] bg-[#27262c] rounded-3xl text-[#f4eeff]">
          <div className="p-6 border-b-[1px] border-b-[#383241]">
            <h1 className="text-xl font-bold">Swap</h1>
            <h5 className="text-[#b8a9b7] text-sm font-medium my-3">
              Trade tokens in an instant
            </h5>
          </div>
          <div className="p-6">
            <CurrencySwap />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
