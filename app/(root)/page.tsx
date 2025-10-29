import React from "react";

import { Metadata } from "next";

import HomepageFeature from "@/features/Root/Homepage";

export const metadata: Metadata = {
  title: "Job Portal",
};

const Homepage: React.FC = () => {
  return <HomepageFeature />;
};

export default Homepage;
