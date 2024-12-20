import Image from 'next/image';
import { User } from '@/types/User';

export default function SingleSeat({ user, seatNumber }: { user?: User; seatNumber: number }) {
  // TODO: 유저 정보 들어왔을 때의 로직 작성
  return (
    <button
      type="button"
      className={`${!user && 'cursor-default'} flex flex-col items-center justify-center gap-2 p-2 px-6`}
    >
      <Image src="/image/seat.svg" alt="seat" width={40} height={40} />
      <p className="text-xl">{seatNumber}</p>
    </button>
  );
}
