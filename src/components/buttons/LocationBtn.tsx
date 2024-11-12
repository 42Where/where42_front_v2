import { Button } from "@/components/ui/button";
import React from "react";
import { User, SearchedUser } from "@/types/User";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function LocationBtn({
  user,
  isMyProfile,
}: {
  user: SearchedUser | User;
  isMyProfile?: boolean;
}) {
  const [location, setLocation] = React.useState<string>("");
  React.useEffect(() => {
    if ("location" in user && user.location) {
      setLocation(user.location);
    } else if (
      ("inCluster" in user && user.inCluster) ||
      ("inOrOut" in user && user.inOrOut)
    ) {
      setLocation("개포");
    } else {
      setLocation("퇴근");
    }
  }, [user]);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={`rounded-full
            ${!isMyProfile && "cursor-default"}
            ${
              location !== "퇴근"
                ? "bg-darkblue"
                : "border-2 border-darkblue bg-white text-darkblue hover:bg-white"
            } h-6 px-2 md:h-8 md:px-3 md:text-xl `}
          >
            {location}
          </Button>
        </TooltipTrigger>
        {isMyProfile && <TooltipContent>내 위치 변경</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}
