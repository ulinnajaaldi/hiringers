import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <header
        className="bg-neutral-10 flex h-16 items-center justify-end"
        style={{
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.10)",
        }}
      >
        <nav className="container mx-auto flex items-center justify-end px-4">
          <Avatar>
            <AvatarImage
              src="https://github.com/ulinnajaaldi.png"
              alt="@ulinnajaaldi"
            />
            <AvatarFallback>UA</AvatarFallback>
          </Avatar>
        </nav>
      </header>
      {children}
    </>
  );
};

export default RootLayout;
