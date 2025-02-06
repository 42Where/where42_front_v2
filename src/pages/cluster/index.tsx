import { useEffect, useState, useRef } from 'react';
import {
  ClusterName,
  CX1Cluster,
  CX2Cluster,
  EvenCluster,
  OddCluster,
  RowName,
} from '@/types/Cluster';
import SeatNavigator from '@/components/seat/Navigator';
import NormalCluster from '@/components/seat/nonX/Cluster';
import CX1ClusterComp from '@/components/seat/X/CX1Cluster';
import CX2ClusterComp from '@/components/seat/X/CX2Cluster';
import Header from '@/components/header/Header';
import { updateClusterUser } from '@/lib/clusterUtils';
import clusterApi from '@/api/clusterApi';
import useInfoSet from '@/lib/hooks';
import { useClusterStore } from '@/lib/stores';
import { useAdminStatus } from '@/hooks';

export default function SeatsPage() {
  const [selectedCluster, setSelectedCluster] = useState<ClusterName>('c1');
  const { clusters, setClusters } = useClusterStore();
  const currentCluster = clusters[selectedCluster];
  const fetchedClusters = useRef<Record<ClusterName, boolean>>({
    c1: false,
    c2: false,
    cx1: false,
    cx2: false,
    c3: false,
    c4: false,
    c5: false,
    c6: false,
  });
  useInfoSet();
  const isAdmin = useAdminStatus().data?.admin;

  useEffect(() => {
    if (fetchedClusters.current[selectedCluster]) return;
    clusterApi.getClusterUsers({ cluster: selectedCluster }).then((users) => {
      const updatedClusters = users.reduce(
        (updated, user) =>
          updateClusterUser(
            updated,
            selectedCluster,
            `r${String(user.row)}` as RowName,
            user.seat,
            user,
          ),
        clusters,
      );
      setClusters(updatedClusters); // 한 번만 호출
    });
    fetchedClusters.current[selectedCluster] = true; // 플래그 설정
  }, [selectedCluster]);

  return (
    <main className="flex h-full min-h-screen w-full flex-col items-center justify-start px-1 pb-20 md:px-10">
      <Header isAdmin={!!isAdmin} isClusterPage />
      <div className="flex flex-col items-center justify-center gap-4 md:gap-10">
        <SeatNavigator selectedCluster={selectedCluster} setSelectedCluster={setSelectedCluster} />
        <div className="flex flex-row gap-10">
          {selectedCluster === 'cx1' && (
            <CX1ClusterComp clusterData={currentCluster as CX1Cluster} />
          )}
          {selectedCluster === 'cx2' && (
            <CX2ClusterComp clusterData={currentCluster as CX2Cluster} />
          )}
          {selectedCluster.length < 3 && (
            <NormalCluster clusterData={currentCluster as OddCluster | EvenCluster} />
          )}
        </div>
      </div>
    </main>
  );
}
