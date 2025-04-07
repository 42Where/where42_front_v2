import { User } from '@/types/User';

export type GetMyInfo = () => Promise<User>;
export type Logout = () => Promise<void>;
