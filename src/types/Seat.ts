import { User } from '@/types/User';

export type Cluster = 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'cx1' | 'cx2';
type Row = 'r1' | 'r2' | 'r3' | 'r4' | 'r5' | 'r6';
type Seat = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type SeatInfo = {
  user?: User;
  cluster: Cluster;
  row: Row;
  seat: Seat;
};
