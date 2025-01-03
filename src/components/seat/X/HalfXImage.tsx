import Image from 'next/image';

export default function HalfXImage({ rot }: { rot?: boolean }) {
  return (
    <>
      <Image
        src="/image/seats/CX1HalfCross.svg"
        width={240}
        height={240}
        className={`hidden md:block ${rot && 'rotate-180'}`}
        alt="CX1HalfCross"
      />
      <Image
        src="/image/seats/CX1HalfCrossMobile.svg"
        width={80}
        height={120}
        className={`block md:hidden ${rot && 'rotate-180'}`}
        alt="CX1HalfCrossMobile"
      />
    </>
  );
}
