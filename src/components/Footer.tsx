import React from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RepoLink from './utils/RepoLink';

export default function Footer() {
  return (
    <footer
      className="relative bottom-0 left-0 flex w-full flex-row items-center justify-center gap-2
      border bg-[#F6F7F9] p-2 md:gap-4 md:p-4"
    >
      <RepoLink />
      <span className="flex flex-col items-center justify-center gap-2  text-darkblue">
        <Link href="https://forms.gle/VbjaSrZRPjuqVyuz9">
          <p className="rounded-lg text-xs hover:bg-gray-200 hover:underline md:text-lg">
            버그 제보/문의
          </p>
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <p className="cursor-pointer rounded-lg text-xs hover:bg-gray-200 hover:underline md:text-lg">
              개인정보 이용 동의서
            </p>
          </DialogTrigger>
          <DialogContent className="max-w-[800px] gap-2  text-darkblue">
            <DialogHeader className="text-m  ">
              <DialogTitle>
                <h2 className="text-l">개인정보 수집 및 이용 동의서(필수)</h2>
              </DialogTitle>
              (재)이노베이션 아카데미는 『개인정보 보호법』 제15조 등 관련
              법령에 따라 서비스 이용자의 개인정보보호를 매우 중시하며, 서비스
              제공에 반드시 필요한 개인정보의 수집⦁이용을 위하여 귀하의 동의를
              받고자 합니다.
            </DialogHeader>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  개인정보의 수집 및 이용 목적
                </AccordionTrigger>
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
                  귀하는 개인정보 수집 및 이용에 대해 동의를 거부할 권리가
                  있습니다. 필수항목에 대한 동의 거부 시 어디있니 서비스 제공이
                  제한됨을 알려드립니다.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </DialogContent>
        </Dialog>
      </span>
    </footer>
  );
}
