import { User, SearchedUser } from '@/types/User';

type GetMemberInfo = (params: { intraId: number }) => Promise<User>;
type UpdateComment = (params: { comment: string }) => Promise<void>;
type DeleteComment = () => Promise<void>;
type DeleteAccount = () => Promise<void>;
type SearchMember = (params: { keyWord: string }) => Promise<SearchedUser[]>;

export type { GetMemberInfo, UpdateComment, DeleteComment, DeleteAccount, SearchMember };
