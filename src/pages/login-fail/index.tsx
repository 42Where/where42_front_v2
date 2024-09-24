import React from "react";
import Image from "next/image";
import LoginBtn from "@/components/buttons/LoginBtn";

export default function LoginFailPage() {
  return (
    <main className="text-darkblue flex min-h-[100vh] w-full flex-col sm:flex-row">
      <div className="pt-8 sm:relative sm:min-h-[50vh] sm:w-1/2">
        <Image
          src="/image/fill/left.png"
          alt="left"
          layout="fill"
          className="hidden sm:block"
        />
      </div>
      <div className="w-full bg-white sm:w-1/2">
        {/* <Image
          src='/Icons/help.svg'
          alt='help'
          width={80}
          height={80}
          priority
          className='absolute top-2 right-2 size-10 sm:top-4 sm:right-4 sm:size-16'
        /> */}
        <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-8 sm:gap-8">
          <Image
            src="/image/logo/logo.svg"
            alt="logo"
            width={100}
            height={100}
            priority
            className="size-28 sm:size-32"
          />
          <span className="flex flex-col items-center gap-4">
            <h1 className=" text-4xl sm:text-6xl">로그인에 실패했습니다.😢</h1>
            <h3 className="text-l sm:text-2xl ">
              아래 버튼을 눌러 다시 시도해주세요.
            </h3>
            <h3 className="text-l sm:text-2xl ">
              오류가 계속 반복될 경우 관리자에게 문의해주세요.
            </h3>
          </span>
          <LoginBtn />
        </div>
      </div>
      <div className="relative flex min-h-[50vh] w-full flex-col items-center justify-center sm:hidden">
        <Image src="/image/fill/bottom.png" alt="bottom" layout="fill" />
        <LoginBtn isMobile={true} />
      </div>
    </main>
  );
}
