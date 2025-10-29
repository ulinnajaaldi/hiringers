import DashboardNav from "@/components/layout/dashboard-nav";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <DashboardNav />
      {children}
    </>
  );
};

export default DashboardLayout;
