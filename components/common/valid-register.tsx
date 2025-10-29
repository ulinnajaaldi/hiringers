import React from "react";

import Image from "next/image";

const ValidRegister: React.FC<{
  email: string;
}> = ({ email }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center">
      <p className="text-heading-m text-neutral-90 font-bold">
        Periksa Email Anda
      </p>
      <p className="text-s text-neutral-90">
        Kami sudah mengirimkan link register ke{" "}
        <span className="font-bold">{email}</span> yang berlaku dalam{" "}
        <span className="font-bold">30 menit</span>
      </p>
      <div className="relative h-[184px] w-auto">
        <Image
          src="/images/register-submited.png"
          alt="Register Submited"
          width={512}
          height={512}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
};

export default ValidRegister;
