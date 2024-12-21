import Image from 'next/image';
import { User } from '@/types/User';

export default function SingleSeat({
  user,
  isFriend,
  seatNumber,
}: {
  user?: User;
  isFriend?: boolean;
  seatNumber: number;
}) {
  // TODO: 유저 정보 들어왔을 때의 로직 작성
  // 유저 하나하나당 isFriend API 보내기는 좀 그렇고, DefaultGroup 처음에 한 번 받아와서 그걸로 체크하자.
  return (
    <button
      type="button"
      className={`flex cursor-default flex-col items-center justify-center gap-1 rounded-md p-4 py-2
        ${user && 'cursor-pointer hover:bg-secondary'}
        ${isFriend && 'border-2 border-basepink'}`}
    >
      <Image
        src={`${user ? user.image : '/image/seats/seat.svg'}`}
        alt="seat"
        width={20}
        height={20}
      />
      <p className="text-xs">{seatNumber}</p>
    </button>
  );
}
