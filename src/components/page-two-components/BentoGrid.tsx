import React from "react";
import BentoFirst from "./BentoFirst";
import BentoSecond from "./BentoSecond";
import BentoFourth from "./BentoFourth";
import BentoFifth from "./BentoFifth";

const BentoGrid = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mt-6 sm:mt-10">
      {/* Row 1: Wide Active Role & Narrow Internship Role */}
      <div className="md:col-span-2 lg:col-span-4 flex">
        <BentoFirst />
      </div>
      <div className="md:col-span-1 lg:col-span-2 flex">
        <BentoFourth />
      </div>

      {/* Row 2: Narrow DevOps/AI Role & Wide Full Stack Role */}
      <div className="md:col-span-1 lg:col-span-2 flex">
        <BentoFifth />
      </div>
      <div className="md:col-span-2 lg:col-span-4 flex">
        <BentoSecond />
      </div>
    </div>
  );
};

export default BentoGrid;
