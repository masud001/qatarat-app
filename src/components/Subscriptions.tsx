import React from "react";
import { IoStar } from "react-icons/io5";
import GradientButton from "./GradientButton";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Subscriptions: React.FC = () => {
  return (
    <div className="subscription-bg w-[305px] min-h-[160px] py-6 px-12 flex flex-col gap-2.5 rounded-r-2xl">
      <SubscriptionHeader />
      <SubscriptionDescription />
      <SubscriptionAction />
    </div>
  );
};

const SubscriptionHeader: React.FC = () => (
  <h4 className="flex justify-start items-start gap-1 text-xl font-medium text-white open-sauce-one-medium">
    <IoStar className="w-6 h-6 text-[#FFBE0A]" />
    Premium
  </h4>
);

const SubscriptionDescription: React.FC = () => (
  <p className="text-base font-medium text-white open-sauce-one-medium">
    We have subscription, Do you want to subscribe?
  </p>
);

const SubscriptionAction: React.FC = () => (
  <div className="pt-1">
    <GradientButton
      text="Subscribe Now"
      icon={<IoMdCheckmarkCircleOutline />}
      onClick={() => alert("Clicked!")}
    />
  </div>
);

export default Subscriptions;