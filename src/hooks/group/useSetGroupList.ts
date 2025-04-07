import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { Group } from '@/types';

export function useSetGroupList(groups: Group[]) {
  const queryClient = useQueryClient();

  const handleGroupSet = useCallback(() => {
    queryClient.setQueryData(['groupList'], {
      defaultGroup: groups[groups.length - 1],
      groups: groups.slice(0, -1),
    });
  }, []);

  return handleGroupSet;
}
