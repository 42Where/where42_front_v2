import Image from 'next/image';
import LoginBtn from '@/components/buttons/LoginBtn';
import logo from '@/assets/logo/logo.svg';

export default function LoginPage() {
  return (
    <main className="flex min-h-[100vh] w-full flex-col text-darkblue sm:flex-row">
      <div className="pt-8 sm:relative sm:min-h-[50vh] sm:w-1/2">
        <Image src="/image/fill/left.png" alt="left" layout="fill" className="hidden sm:block" />
      </div>
      <div className="w-full bg-white sm:w-1/2">
        <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-8 sm:gap-12">
          <Image src={logo} alt="logo" priority className="size-28 sm:size-32" />
          <span className="flex flex-col items-center gap-4">
            <h3 className="text-l sm:text-2xl">42Seoul 위치 정보 검색 서비스</h3>
            <h1 className="text-4xl sm:text-6xl">어디있니?</h1>
          </span>
          <LoginBtn />
        </div>
      </div>
      <div className="relative flex min-h-[50vh] w-full flex-col items-center justify-center sm:hidden">
        <Image src="/image/fill/bottom.png" alt="bottom" layout="fill" />
        <LoginBtn isMobile />
      </div>
    </main>
  );
}
