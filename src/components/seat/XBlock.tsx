import Image from 'next/image';
import Row from '@/components/seat/Row';

const dummySeats = [
  {
    cluster: 'cx1',
    row: 'r1',
    seat: 1,
    user: {
      image: '/image/user/user.svg',
    },
  },
  {
    cluster: 'cx1',
    row: 'r1',
    seat: 2,
  },
];

export default function XBlock() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative size-fit">
        <Image src="/image/seats/CX1HalfCross.svg" width={240} height={240} alt="CX1Cross" />
        <Row seats={dummySeats} position="top" pad />
        <Row seats={dummySeats} position="bottom" />
      </div>
      <div className="relative size-fit">
        <Image
          src="/image/seats/CX1HalfCross.svg"
          className="rotate-180"
          width={240}
          height={240}
          alt="CX1Cross"
        />
        <Row seats={dummySeats} position="top" />
        <Row seats={dummySeats} position="bottom" pad />
      </div>
    </div>
  );
}
