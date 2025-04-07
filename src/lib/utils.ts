import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GetAllGroupsResponse } from '@/types/api/group';

// eslint-disable-next-line import/prefer-default-export
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSortedGroups(groupRes: GetAllGroupsResponse) {
  const { defaultGroup } = groupRes;
  defaultGroup.groupName = '친구 목록';
  const sortedGroups = [...groupRes.groups, { ...defaultGroup }];
  return sortedGroups;
}
