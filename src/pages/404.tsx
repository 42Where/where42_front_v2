import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo/logo.svg';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[100vh] w-full flex-col text-darkblue sm:flex-row">
      <div className="pt-8 sm:relative sm:min-h-[50vh] sm:w-1/2">
        <Image src="/image/fill/left.png" alt="left" layout="fill" className="hidden sm:block" />
      </div>
      <div className="w-full bg-white sm:w-1/2">
        <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-8 sm:gap-12">
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            priority
            className="size-28 sm:size-32"
          />
          <span className="flex flex-col items-center gap-4">
            <h2 className=" text-2xl sm:text-3xl">이 페이지는 존재하지 않습니다.</h2>
          </span>
          <Link href="/">
            <Button className={`${'bg-darkblue'} rounded-full `} size="xlg">
              메인으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
      <div className="relative flex min-h-[50vh] w-full flex-col items-center justify-center sm:hidden">
        <Image src="/image/fill/bottom.png" alt="bottom" layout="fill" />
      </div>
    </main>
  );
}
