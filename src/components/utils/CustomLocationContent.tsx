import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useUserStore } from "@/lib/stores";
import LocationCascader from "./LocationCascader";
import { Button } from "@/components/ui/button";
import locationApi from "@/api/locationApi";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function CustomLocationContent({
  resultMessage,
  setResultMessage,
}: {
  resultMessage: string;
  setResultMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { user, setUser } = useUserStore();
  const [locationValue, setLocationValue] = React.useState<string>("");

  if (!user) return null;
  return user.inCluster ? (
    <DialogContent className="min-h-[400px] max-w-[550px] transition-all duration-500 ease-out">
      <DialogHeader className="gap-2">
        <DialogTitle>수동 자리 설정</DialogTitle>
      </DialogHeader>
      <p className="text-l  text-darkblue">{resultMessage}</p>
      <ScrollArea className="h-[350px] w-full">
        <LocationCascader setLocationValue={setLocationValue} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex flex-row items-center justify-between">
        <div />
        <div className="flex flex-row gap-2">
          <Button
            className="bg-darkblue"
            onClick={() => {
              setResultMessage("설정 되었습니다.");
              locationApi
                .setCustomLocation({ location: locationValue })
                .then(() => setUser({ ...user, location: locationValue }))
                .catch((error) => {
                  console.error(error);
                  setResultMessage(
                    "설정 중 오류가 발생했습니다. 다시 시도해 주세요.",
                  );
                });
            }}
          >
            설정
          </Button>
          <Button
            onClick={() => {
              setResultMessage("삭제 되었습니다.");
              locationApi
                .deleteCustomLocation()
                .then(() => setUser({ ...user, location: "" }))
                .catch((error) => {
                  console.error(error);
                  setResultMessage(
                    "삭제 중 오류가 발생했습니다. 다시 시도해 주세요.",
                  );
                });
            }}
          >
            자리 초기화
          </Button>
          <DialogClose asChild>
            <Button variant="destructive">취소</Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  ) : (
    <DialogContent
      className="flex min-h-[300px] max-w-[550px] flex-col
      items-center justify-center transition-all duration-500 ease-out"
    >
      <p className="text-center text-xl  ">
        수동 위치 설정은 클러스터 안에 있을 때만 가능해요 😢
      </p>
    </DialogContent>
  );
}
