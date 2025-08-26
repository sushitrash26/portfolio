'use client'

import PageOneContainer from "@/components/page-one-component/PageOneContainer";
import PageTwoContainer from "@/components/page-two-components/PageTwoContainer";




export default function Home() {
  return (
    <div className="bg-black p-6  grid justify-center items-center gap-4 scrollbar-hide  ">
    <PageOneContainer/>
    <PageTwoContainer/>
    </div>
  );
}
