import React from "react";
import FAQAccordion from "../common/FAQAccordion";

const FAQS=()=>{
    return(

        <div className="mx-4 mt-8 space-y-4">
            <h1 className="font-bold text-5xl">FAQ</h1>
            <div className="flex flex-col space-y-2 pb-2">
            <FAQAccordion header="What is Flowbite?" >Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.</FAQAccordion>
            <FAQAccordion header="What is Flowbite?" >Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.</FAQAccordion>
            <FAQAccordion header="What is Flowbite?" >Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.</FAQAccordion>
            </div>
        </div>
    )
}
export default FAQS;