import Seat from '@/components/seat/Seat';
import { ActiveClusterUser } from '@/types/Cluster';

export default function RenderSeat({ seat }: { seat: number | ActiveClusterUser }) {
  if (typeof seat === 'number') return <Seat seatNumber={seat} />;
  return <Seat seatNumber={seat.seat} clusterUser={seat} />;
}
