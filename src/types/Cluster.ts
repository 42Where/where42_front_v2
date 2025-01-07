type ClusterName = 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'cx1' | 'cx2';

type RowName = 'r1' | 'r2' | 'r3' | 'r4' | 'r5' | 'r6' | 'r7' | 'r8' | 'r9' | 'r10';

type Row = ReadonlyArray<number | ActiveClusterUser>; // 배열 자체를 읽기 전용으로 설정

type CX1Cluster = {
  r1: Row;
  r2: Row;
  r3: Row;
  r4: Row;
  r5: Row;
};

type CX2Cluster = CX1Cluster & {
  r6: Row;
  r7: Row;
  r8: Row;
};

type OddCluster = {
  r1: Row;
  r2: Row;
  r3: Row;
  r4: Row;
  r5: Row;
  r6: Row;
  r7: Row;
  r8: Row;
  r9: Row;
};

type EvenCluster = OddCluster & {
  r10: Row;
};

type Clusters = {
  c1: OddCluster;
  c2: EvenCluster;
  cx1: CX1Cluster;
  cx2: CX2Cluster;
  c3: OddCluster;
  c4: EvenCluster;
  c5: OddCluster;
  c6: EvenCluster;
};

type ActiveClusterUser = {
  intraId: number;
  intraName: string;
  image?: string;
  cluster: ClusterName;
  row: number;
  seat: number;
  isFriend: boolean;
};

export type {
  ClusterName,
  RowName,
  Row,
  CX1Cluster,
  CX2Cluster,
  OddCluster,
  EvenCluster,
  Clusters,
  ActiveClusterUser,
};
