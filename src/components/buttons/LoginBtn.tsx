import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function LoginBtn({ isMobile }: { isMobile?: boolean }) {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Button
      className={`${isMobile ? 'bg-[#4A6282] absolute z-auto' : 'bg-darkblue hidden sm:block'} rounded-full `}
      size="xlg"
      onClick={() => {
        setIsClicked(true);
        router.push(`${process.env.NEXT_PUBLIC_DEV_API_URL}/`);
      }}
      disabled={isClicked}
    >
      {isClicked ? '로그인 중...' : 'L O G I N'}
    </Button>
  );
}
