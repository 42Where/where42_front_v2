import React from 'react';
import Image from 'next/image';
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

export default function Footer() {
  return (
    <footer
      className='flex flex-row justify-center items-center w-full p-2 gap-2 md:p-4 md:gap-4
      border bottom-0 left-0 fixed bg-[#F6F7F9]'
    >
      <Link href='https://github.com/42Where'>
        <Image
          src='/Icons/logoC.svg'
          alt='logo'
          width={120}
          height={120}
          className='
        md:w-[120px] w-[80px]'
        />
      </Link>
      <span className='flex flex-col gap-2 items-center justify-center font-gsansMd text-[#3F4145]'>
        <Link href='https://forms.gle/VbjaSrZRPjuqVyuz9'>
          <p className='rounded-lg hover:bg-gray-200 hover:underline text-xs md:text-lg'>
            버그 제보/문의
          </p>
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <p className='rounded-lg hover:bg-gray-200 hover:underline text-xs md:text-lg'>
              개인정보 이용 동의서
            </p>
          </DialogTrigger>
          <DialogContent className='max-w-[800px] font-gsansMd text-[#132743E0] gap-2'>
            <DialogHeader className='text-m font-gsansMd text-[#4A6282]'>
              <DialogTitle className='text-l font-gsansLg text-[#132743]'>
                개인정보 수집 및 이용 동의서(필수)
              </DialogTitle>
              (재)이노베이션 아카데미는 『개인정보 보호법』 제15조 등 관련
              법령에 따라 서비스 이용자의 개인정보보호를 매우 중시하며, 서비스
              제공에 반드시 필요한 개인정보의 수집⦁이용을 위하여 귀하의 동의를
              받고자 합니다.
            </DialogHeader>
            <Accordion type='multiple' className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>
                  개인정보의 수집 및 이용 목적
                </AccordionTrigger>
                <AccordionContent>
                  어디있니 현재 위치 확인 서비스 제공
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
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
              <AccordionItem value='item-3'>
                <AccordionTrigger>개인정보의 보유 및 이용기간</AccordionTrigger>
                <AccordionContent>
                  3년, 보유기간 경과 및 보유목적 달성 시 지체 없이 파기합니다
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-4'>
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
