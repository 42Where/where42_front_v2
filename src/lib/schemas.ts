import { Clusters } from '@/types/Cluster';
import { CascaderOption } from '@/types/CascaderOption';

export const CustomLocationSchema: CascaderOption = {
  label: '개포',
  value: '개포',
  children: [
    {
      label: '지하',
      value: '지하',
    },
    {
      label: '1층',
      value: '1층',
      children: [
        { label: '오픈스튜디오', value: '오픈스튜디오' },
        { label: '회의실', value: '회의실' },
      ],
    },
    {
      label: '2층',
      value: '2층',
      children: [
        {
          label: 'C1',
          value: 'c1',
          children: [
            { label: '회의실', value: '회의실' },
            { label: '테이블', value: '테이블' },
            { label: '테라스', value: '테라스' },
          ],
        },
        {
          label: 'C2',
          value: 'c2',
          children: [
            { label: '테이블', value: '테이블' },
            { label: '테라스', value: '테라스' },
          ],
        },
      ],
    },
    {
      label: '3층',
      value: '3층',
      children: [
        {
          label: 'CX1',
          value: 'cx1',
          children: [
            { label: '회의실', value: '회의실' },
            { label: '테이블', value: '테이블' },
            { label: '테라스', value: '테라스' },
          ],
        },
        {
          label: 'CX2',
          value: 'cx2',
          children: [
            { label: '테이블', value: '테이블' },
            { label: '테라스', value: '테라스' },
          ],
        },
      ],
    },
    {
      label: '4층',
      value: '4층',
      children: [
        {
          label: 'C3',
          value: 'c3',
          children: [
            { label: '회의실', value: '회의실' },
            { label: '테이블', value: '테이블' },
            { label: '테라스', value: '테라스' },
          ],
        },
        {
          label: 'C4',
          value: 'c4',
          children: [
            { label: '테이블', value: '테이블' },
            { label: '테라스', value: '테라스' },
          ],
        },
      ],
    },
    {
      label: '5층',
      value: '5층',
      children: [
        {
          label: 'C5',
          value: 'c5',
          children: [
            { label: '집현전', value: '집현전' },
            { label: '테이블', value: '테이블' },
            { label: '테라스', value: '테라스' },
          ],
        },
        {
          label: 'C6',
          value: '개포 5층 c6',
          children: [
            { label: '테이블', value: '개포 5층 c6 테이블' },
            { label: '테라스', value: '개포 5층 c6 테라스' },
          ],
        },
      ],
    },
    { label: '옥상', value: '옥상' },
  ],
} as const;

// mutable 해야 하기 때문에 as const 선언 안 함
export const ClusterSchema: Clusters = {
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
