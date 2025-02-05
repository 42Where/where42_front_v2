import Image from 'next/image';
import CX1HalfCross from '@/assets/seats/CX1HalfCross.svg';
import CX1HalfCrossMobile from '@/assets/seats/CX1HalfCrossMobile.svg';

export default function HalfXImage({ rot }: { rot?: boolean }) {
  return (
    <>
      <Image
        src={CX1HalfCross}
        width={240}
        height={240}
        className={`hidden md:block 2xl:w-96 ${rot && 'rotate-180'}`}
        alt="CX1HalfCross"
      />
      <Image
        src={CX1HalfCrossMobile}
        width={80}
        height={120}
        className={`block md:hidden ${rot && 'rotate-180'}`}
        alt="CX1HalfCrossMobile"
      />
    </>
  );
}
