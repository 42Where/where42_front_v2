import { Admin } from '@/types/Admin';

export type GetMyStatus = () => Promise<Admin>;
export type GetAllStatus = () => Promise<Admin[]>;
type ChangeStatusParams = {
  intraName: string;
  role: string;
};
export type ChangeStatus = (params: ChangeStatusParams) => Promise<Admin | String>;
