import React from "react";

import { Metadata } from "next";

import AdminFeature from "@/features/Dashboard/Admin";
import { JobOpeningStore } from "@/features/Dashboard/Admin/hook";

export const metadata: Metadata = {
  title: "Admin Portal",
};

const AdminPage: React.FC = () => {
  return (
    <JobOpeningStore>
      <AdminFeature />
    </JobOpeningStore>
  );
};

export default AdminPage;
