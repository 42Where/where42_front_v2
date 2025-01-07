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

const clustersSchema: Clusters = {
  c1: {
    r1: [1, 2, 3, 4, 5, 6, 7],
    r2: [1, 2, 3, 4, 5, 6, 7],
    r3: [1, 2, 3, 4, 5, 6, 7],
    r4: [1, 2, 3, 4, 5, 6, 7],
    r5: [1, 2, 3, 4, 5, 6, 7],
    r6: [1, 2, 3, 4, 5, 6, 7],
    r7: [1, 2, 3, 4, 5, 6, 7],
    r8: [1, 2, 3, 4, 5, 6, 7],
    r9: [1, 2, 3, 4, 5, 6, 7],
  },
  c2: {
    r1: [1, 2, 3, 4, 5, 6, 7, 8],
    r2: [1, 2, 3, 4, 5, 6, 7, 8],
    r3: [1, 2, 3, 4, 5, 6, 7, 8],
    r4: [1, 2, 3, 4, 5, 6, 7, 8],
    r5: [1, 2, 3, 4, 5, 6, 7, 8],
    r6: [1, 2, 3, 4, 5, 6, 7, 8],
    r7: [1, 2, 3, 4, 5, 6, 7, 8],
    r8: [1, 2, 3, 4, 5, 6, 7, 8],
    r9: [1, 2, 3, 4, 5, 6, 7, 8],
    r10: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  cx1: {
    r1: [1, 2, 3, 4],
    r2: [1, 2, 3, 4],
    r3: [1, 2, 3, 4],
    r4: [1, 2, 3, 4, 5, 6, 7, 8],
    r5: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  cx2: {
    r1: [1, 2, 3, 4],
    r2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    r3: [1, 2, 3, 4, 5, 6, 7, 8],
    r4: [1, 2, 3, 4, 5, 6],
    r5: [1, 2, 3, 4, 5, 6],
    r6: [1, 2, 3, 4, 5, 6, 7, 8],
    r7: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    r8: [1, 2, 3, 4],
  },
  c3: {
    r1: [1, 2, 3, 4, 5, 6, 7],
    r2: [1, 2, 3, 4, 5, 6, 7],
    r3: [1, 2, 3, 4, 5, 6, 7],
    r4: [1, 2, 3, 4, 5, 6, 7],
    r5: [1, 2, 3, 4, 5, 6, 7],
    r6: [1, 2, 3, 4, 5, 6, 7],
    r7: [1, 2, 3, 4, 5, 6, 7],
    r8: [1, 2, 3, 4, 5, 6, 7],
    r9: [1, 2, 3, 4, 5, 6, 7],
  },
  c4: {
    r1: [1, 2, 3, 4, 5, 6, 7, 8],
    r2: [1, 2, 3, 4, 5, 6, 7, 8],
    r3: [1, 2, 3, 4, 5, 6, 7, 8],
    r4: [1, 2, 3, 4, 5, 6, 7, 8],
    r5: [1, 2, 3, 4, 5, 6, 7, 8],
    r6: [1, 2, 3, 4, 5, 6, 7, 8],
    r7: [1, 2, 3, 4, 5, 6, 7, 8],
    r8: [1, 2, 3, 4, 5, 6, 7, 8],
    r9: [1, 2, 3, 4, 5, 6, 7, 8],
    r10: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  c5: {
    r1: [1, 2, 3, 4, 5, 6, 7],
    r2: [1, 2, 3, 4, 5, 6, 7],
    r3: [1, 2, 3, 4, 5, 6, 7],
    r4: [1, 2, 3, 4, 5, 6, 7],
    r5: [1, 2, 3, 4, 5, 6, 7],
    r6: [1, 2, 3, 4, 5, 6, 7],
    r7: [1, 2, 3, 4, 5, 6, 7],
    r8: [1, 2, 3, 4, 5, 6, 7],
    r9: [1, 2, 3, 4, 5, 6, 7],
  },
  c6: {
    r1: [1, 2, 3, 4, 5, 6, 7, 8],
    r2: [1, 2, 3, 4, 5, 6, 7, 8],
    r3: [1, 2, 3, 4, 5, 6, 7, 8],
    r4: [1, 2, 3, 4, 5, 6, 7, 8],
    r5: [1, 2, 3, 4, 5, 6, 7, 8],
    r6: [1, 2, 3, 4, 5, 6, 7, 8],
    r7: [1, 2, 3, 4, 5, 6, 7, 8],
    r8: [1, 2, 3, 4, 5, 6, 7, 8],
    r9: [1, 2, 3, 4, 5, 6, 7, 8],
    r10: [1, 2, 3, 4, 5, 6, 7, 8],
  },
};

// getClusters로 안전한 복사본 제공
export const getClusters = (): Clusters => JSON.parse(JSON.stringify(clustersSchema));

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
