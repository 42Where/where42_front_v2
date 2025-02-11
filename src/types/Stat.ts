import { ClusterName } from './Cluster';

type ImacUsage = {
  usageRate: number;
  usingImacUserCount: number;
  totalImacUserCount: number;
};

type ClusterUsage = {
  name: ClusterName;
  usageRate: number;
  usingImacCount: number;
  totalImacCount: number;
};

type ClusterUsageResponse = {
  clusters: ClusterUsage[];
};

type SeatsArray = {
  seats: string[];
};

export type { ImacUsage, ClusterUsage, ClusterUsageResponse, SeatsArray };
