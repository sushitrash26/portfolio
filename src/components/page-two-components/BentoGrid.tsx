import React from "react";
import BentoFirst from "./BentoFirst";
import BentoSecond from "./BentoSecond";
import BentoThird from "./BentoThird";

const BentoGrid = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-7 gap-4 mt-6 sm:mt-10">
      <div className="lg:col-span-3">
        <BentoFirst/>
      </div>
      <div className="lg:col-span-4 grid gap-4">
        <BentoSecond/>
        <BentoThird/>
      </div>
    </div>
  );
};

export default BentoGrid;
