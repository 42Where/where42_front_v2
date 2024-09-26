import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import SearchModal from "@/components/modals/SearchModal";
import LogoutBtn from "@/components/buttons/LogoutBtn";

export default function Header() {
  const router = useRouter();
  return (
    <header className="flex flex-row items-center justify-between p-2 pb-0 md:p-4">
      <Image
        src="/image/logo/logoC.svg"
        alt="logo"
        width={200}
        height={100}
        className="h-[75px] w-[150px] lg:h-[100px] lg:w-[200px]"
      />
      <div className="flex flex-row gap-2">
        <SearchModal />
        <LogoutBtn />
      </div>
    </header>
  );
}
