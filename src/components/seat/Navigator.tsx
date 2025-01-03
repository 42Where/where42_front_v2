import { ClusterName } from '@/types/Cluster';

const clusters: ClusterName[] = ['c1', 'c2', 'cx1', 'cx2', 'c3', 'c4', 'c5', 'c6'];

function SeatTab({
  c,
  isSelected,
  setSelectedCluster,
}: {
  c: ClusterName;
  isSelected: boolean;
  setSelectedCluster: (c: ClusterName) => void;
}) {
  return (
    <button
      type="button"
      className={`${isSelected ? 'border-b border-basepink text-black' : 'text-gray-400'} p-2 text-xs sm:p-4 sm:text-base`}
      onClick={() => {
        if (!isSelected) setSelectedCluster(c);
      }}
    >
      {c}
    </button>
  );
}

export default function SeatNavigator({
  selectedCluster,
  setSelectedCluster,
}: {
  selectedCluster: ClusterName;
  setSelectedCluster: (c: ClusterName) => void;
}) {
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
