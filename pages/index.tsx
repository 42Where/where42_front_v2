import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import useUserStore from "@/stores/useUserStore";
import useAMessage from "@/atoms/AMessage/AMessage";
import { Button } from "antd";
import groupApi from "@/api/groupApi";

export default function Home() {
  const { contextHolder, axiosError } = useAMessage();

  return (
    <main>
      <Button
        onClick={() => {
          axiosError(401);
        }}
      >
        test
      </Button>
      <Button
        onClick={() => {
          groupApi.getAllGroups().then((res) => {
            console.log(res);
          });
        }}
      >
        test
      </Button>
      {contextHolder}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <div className="font-bold text-h1 text-primary-0">
          다람쥐 헌 쳇바퀴 lorem ipsum
        </div>
        <div className="font-bold text-h2 text-primary-1">
          다람쥐 헌 쳇바퀴 lorem ipsum
        </div>
        <div className="font-bold text-h3 text-primary-2">
          다람쥐 헌 쳇바퀴 lorem ipsum
        </div>
        <div className="font-bold text-h4 text-secondary-0">
          다람쥐 헌 쳇바퀴 lorem ipsum
        </div>
        <div className="font-bold text-h5 text-secondary-1">
          다람쥐 헌 쳇바퀴 lorem ipsum
        </div>
        <div className="font-bold text-h6 text-secondary-2">
          다람쥐 헌 쳇바퀴 lorem ipsum
        </div>
        <div className="text-b1 text-grey-0">다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className="text-b2 text-grey-1">다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className="text-b3 text-grey-2">다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className="text-b4 text-grey-3">다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className="text-b5 text-red">다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className="text-b6 text-green">다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className="font-light text-l1">다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className="font-light text-l2">다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className="font-light text-l3">다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className="font-light text-l4">다람쥐 헌 쳇바퀴 lorem ipsum</div>
        <div className="font-light text-l5">다람쥐 헌 쳇바퀴 lorem ipsum</div>
      </div>
    </main>
  );
}
