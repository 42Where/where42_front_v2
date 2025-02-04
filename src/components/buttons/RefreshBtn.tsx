// import React from 'react';
// import Image from 'next/image';
// import groupApi from '@/api/groupApi';
// import { useGroupsStore, useUserStore } from '@/lib/stores';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
// import { Button } from '@/components/ui/button';

// export default function RefreshBtn() {
//   const { setGroups } = useGroupsStore();
//   const { user } = useUserStore();
//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Button variant="ghost" className="h-fit max-h-20 w-fit">
//             <Image
//               src="/image/logo/logoB.svg"
//               alt="logo"
//               width={200}
//               height={100}
//               className="h-[75px] w-[150px] lg:h-[100px] lg:w-[200px]"
//               onClick={async () => {
//                 console.log('refresh');
//                 groupApi.getAllGroups().then((res) => {
//                   res.map((g) => {
//                     const newGroup = g;
//                     if (newGroup.groupId === user?.defaultGroupId) newGroup.groupName = '친구 목록';
//                     return newGroup;
//                   });
//                   setGroups(res);
//                 });
//               }}
//             />
//           </Button>
//         </TooltipTrigger>
//         <TooltipContent>자리상태 새로고침</TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   );
// }
