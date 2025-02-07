import {
  ClusterName,
  RowName,
  Row,
  CX1Cluster,
  CX2Cluster,
  OddCluster,
  EvenCluster,
  Clusters,
  ActiveClusterUser,
} from '@/types/Cluster';

import { ClusterSchema } from '@/lib/schemas';

// getClusters로 안전한 복사본 제공
export const getClusters = (): Clusters => JSON.parse(JSON.stringify(ClusterSchema));

// 특정 위치 업데이트 함수
export const updateClusterUser = (
  clusters: Clusters,
  clusterKey: ClusterName,
  rowKey: RowName,
  index: number,
  user: ActiveClusterUser,
): Clusters => {
  const cluster = clusters[clusterKey] as OddCluster | EvenCluster | CX1Cluster | CX2Cluster;
  try {
    if (!cluster || !(rowKey in cluster)) throw new Error('Invalid cluster or row key');
    const row = (clusters[clusterKey] as Record<RowName, Row>)[rowKey];
    // 1부터 시작하므로 배열 요소와 함께 사용할 때는 -1 해야 함
    if (index - 1 < 0 || index - 1 >= row.length) throw new Error('Index out of bounds');

    // 불변성을 유지하며 업데이트
    const updatedRow = row.map((item, idx) => (idx + 1 === index ? user : item));
    return {
      ...clusters,
      [clusterKey]: {
        ...clusters[clusterKey],
        [rowKey]: updatedRow,
      },
    };
  } catch (e) {
    console.error(e);
    return clusters;
  }
};
