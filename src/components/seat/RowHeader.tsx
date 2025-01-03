import { RowName } from '@/types/Cluster';

export default function RowHeader({ rowName }: { rowName: RowName }) {
  return <h3 className="text-baseblue md:text-2xl">{rowName}</h3>;
}
