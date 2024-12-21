import { useState } from 'react';
import { Cluster } from '@/types/Seat';

const clusters: Cluster[] = ['c1', 'c2', 'cx1', 'cx2', 'c3', 'c4', 'c5', 'c6'];

function SeatTab({
  c,
  isSelected,
  setSelectedCluster,
}: {
  c: Cluster;
  isSelected: boolean;
  setSelectedCluster: (c: Cluster) => void;
}) {
  return (
    <button
      type="button"
      className={`${isSelected ? 'border-b border-basepink text-black' : 'text-gray-400'} p-4`}
      onClick={() => {
        if (!isSelected) setSelectedCluster(c);
      }}
    >
      {c}
    </button>
  );
}

export default function SeatNavigator() {
  const [selectedCluster, setSelectedCluster] = useState<Cluster>('c1');
  return (
    <nav className="flex flex-row items-center justify-center">
      {clusters.map((c) => (
        <SeatTab
          c={c}
          key={c}
          isSelected={c === selectedCluster}
          setSelectedCluster={setSelectedCluster}
        />
      ))}
    </nav>
  );
}
