import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function LoginBtn({ isMobile }: { isMobile?: boolean }) {
  const [isClicked, setIsClicked] = useState(false);

  return !isClicked ? (
    <Link
      href='/v3/group'
      className={`${isMobile ? 'absolute z-auto' : 'hidden sm:block'}`}
      onClick={() => setIsClicked(true)}
    >
      <Button
        className={`${
          isMobile ? 'bg-[#4A6282]' : 'bg-[#132743]'
        } rounded-full `}
        size='xlg'
      >
        L O G I N
      </Button>
    </Link>
  ) : (
    <Button
      className={`${isMobile ? 'bg-[#4A6282]' : 'bg-[#132743]'} rounded-full `}
      size='xlg'
      disabled
    >
      로그인 중...
    </Button>
  );
}
