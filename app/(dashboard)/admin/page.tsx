import React from "react";

import AdminFeature from "@/features/Dashboard/Admin";
import { JobOpeningStore } from "@/features/Dashboard/Admin/hook";

const AdminPage: React.FC = () => {
  return (
    <JobOpeningStore>
      <AdminFeature />
    </JobOpeningStore>
  );
};

export default AdminPage;
