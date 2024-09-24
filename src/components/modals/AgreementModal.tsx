import React from "react";
import { useRouter } from "next/router";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import groupApi from "@/api/groupApi";

export default function AgreementModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}) {
  const router = useRouter();
  return (
    <Dialog open={showModal}>
      <DialogContent className="text-darkblue  max-w-[800px] gap-2">
        <DialogHeader className="text-m  ">
          <DialogTitle>
            <h2 className="text-l  text-darkblue">
              개인정보 수집 및 이용 동의서(필수)
            </h2>
          </DialogTitle>
          (재)이노베이션 아카데미는 『개인정보 보호법』 제15조 등 관련 법령에
          따라 서비스 이용자의 개인정보보호를 매우 중시하며, 서비스 제공에
          반드시 필요한 개인정보의 수집⦁이용을 위하여 귀하의 동의를 받고자
          합니다.
        </DialogHeader>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>개인정보의 수집 및 이용 목적</AccordionTrigger>
            <AccordionContent>
              어디있니 현재 위치 확인 서비스 제공
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>수집하는 개인정보 항목</AccordionTrigger>
            <AccordionContent>
              <span>
                <p>인트라 로그인 아이디</p>
                <p>클러스터 출입 상태</p>
                <p>입실 시 현재 입실 한 클러스터</p>
                <p>출입카드 마지막 태그 시간</p>
              </span>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>개인정보의 보유 및 이용기간</AccordionTrigger>
            <AccordionContent>
              3년, 보유기간 경과 및 보유목적 달성 시 지체 없이 파기합니다
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              동의 거부 권리 및 동의 거부에 따른 불이익 내용 또는 제한사항
            </AccordionTrigger>
            <AccordionContent>
              귀하는 개인정보 수집 및 이용에 대해 동의를 거부할 권리가 있습니다.
              필수항목에 대한 동의 거부 시 어디있니 서비스 제공이 제한됨을
              알려드립니다.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex flex-row items-center justify-between">
          <div />
          <div className="flex flex-row gap-2">
            <Button
              onClick={() => {
                groupApi.agreeJoin();
                setShowModal(false);
              }}
              size={"lg"}
              className="text-xl"
            >
              동의
            </Button>
            <Button
              onClick={() => {
                setShowModal(false);
                router.push("/login");
              }}
              variant={"destructive"}
              size={"lg"}
              className="text-xl"
            >
              거절
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
