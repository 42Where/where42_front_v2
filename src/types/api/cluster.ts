import { ClusterName, ActiveClusterUser } from '@/types/Cluster';

export type GetClusterUsers = ({
  cluster,
}: {
  cluster: ClusterName;
}) => Promise<ActiveClusterUser[]>;
