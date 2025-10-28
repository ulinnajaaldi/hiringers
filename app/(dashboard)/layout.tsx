import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <nav className="flex h-16 items-center justify-between border-b px-5">
        <h1 className="text-xl font-bold text-neutral-100">Job List</h1>
        <Avatar>
          <AvatarImage
            src="https://github.com/ulinnajaaldi.png"
            alt="@ulinnajaaldi"
          />
          <AvatarFallback>UA</AvatarFallback>
        </Avatar>
      </nav>
      {children}
    </>
  );
};

export default DashboardLayout;
