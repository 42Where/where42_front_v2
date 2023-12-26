import { Button } from "antd";
import useModalStore from "@/stores/useModalStore";
import Terms from "@/atoms/Terms/Terms";

import Axios from "axios";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import IconButton from "@/atoms/buttons/IconButton/IconButton";
import PencilIcon from "&/Icons/pencil.svg";

const items: MenuProps["items"] = [
  {
    label: "그룹에 친구 추가하기",
    key: 0,
  },
  {
    label: "그룹 수정하기",
    key: 1,
  },
  {
    label: "그룹 삭제하기",
    key: 2,
    danger: true,
  },
];

export default function Home() {
  const { openModal, openImportantModal, closeModal } = useModalStore();

  return (
    <main>
      <>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <IconButton Icon={PencilIcon} size="medium" />
          </a>
        </Dropdown>
      </>
      <>
        <Button
          type="primary"
          onClick={() => {
            Axios.get(`${process.env.NEXT_PUBLIC_DEV_API_URL}/v3/member`).then(
              (res) => {
                console.log(res);
              }
            );
          }}
        >
          버튼
        </Button>
        <Button type="primary" danger>
          버튼
        </Button>
      </>
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
