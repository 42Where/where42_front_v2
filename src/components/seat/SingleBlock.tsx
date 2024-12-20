import SingleRow from '@/components/seat/SingleRow';

const dummySeats = [
  {
    cluster: 'c1',
    row: 'r1',
    seat: 1,
    user: {
      image: '/image/user/user.svg',
    },
  },
  {
    cluster: 'c1',
    row: 'r1',
    seat: 2,
  },
  {
    cluster: 'c1',
    row: 'r1',
    seat: 3,
  },
  {
    cluster: 'c1',
    row: 'r1',
    seat: 4,
  },
  {
    cluster: 'c1',
    row: 'r1',
    seat: 5,
  },
  {
    cluster: 'c1',
    row: 'r1',
    seat: 6,
  },
  {
    cluster: 'c1',
    row: 'r1',
    seat: 7,
  },
  {
    cluster: 'c1',
    row: 'r1',
    seat: 8,
  },
];

export default function SingleBlock() {
  const oddSeats = [...dummySeats.filter((s) => s.seat % 2 !== 0)];
  const evenSeats = [...dummySeats.filter((s) => s.seat % 2 === 0)];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="hidden flex-row items-end justify-center lg:flex">
        <SingleRow seats={oddSeats} />
        <SingleRow seats={evenSeats} pad />
      </div>
      <h3 className="text-2xl text-darkblue">r1</h3>
      <div className="block lg:hidden">
        <SingleRow seats={dummySeats} />
      </div>
    </div>
  );
}
