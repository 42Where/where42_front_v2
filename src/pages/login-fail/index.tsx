import Image from 'next/image';
import { LoginBtn } from '@/components/buttons';
import logo from '@/assets/logo/logo.svg';
import left from '@/assets/fill/left.png';
import bottom from '@/assets/fill/bottom.png';

export default function LoginFailPage() {
  return (
    <main className="flex min-h-svh w-full flex-col text-darkblue sm:flex-row">
      <div className="pt-8 sm:relative sm:min-h-[50svh] sm:w-1/2">
        <Image src={left} alt="left" layout="fill" className="hidden sm:block" />
      </div>
      <div className="w-full bg-white sm:w-1/2">
        <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-8 sm:gap-8">
          <Image src={logo} alt="logo" priority className="h-28 w-fit" />
          <span className="flex flex-col items-center gap-4">
            <h1 className="text-2xl sm:text-4xl">로그인에 실패했습니다.😢</h1>
            <h3 className="text-l sm:text-xl ">아래 버튼을 눌러 다시 시도해주세요.</h3>
            <h3 className="text-l sm:text-xl ">오류가 반복될 경우 관리자에게 문의해주세요.</h3>
          </span>
          <LoginBtn />
        </div>
      </div>
      <div className="relative flex min-h-[50svh] w-full flex-col items-center justify-center sm:hidden">
        <Image src={bottom} alt="bottom" layout="fill" />
        <LoginBtn isMobile />
      </div>
    </main>
  );
}
