import { Button } from "antd";
import useModalStore from "@/stores/useModalStore";
import Terms from "@/atoms/Terms/Terms";

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
        <Button type="primary">버튼</Button>
        <Button type="primary" danger>
          버튼
        </Button>
        <section>
          <Button
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              openModal(<div>모달창</div>);
            }}
          >
            모달창 띄우기
          </Button>
          <br />
          <Button
            type="primary"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              openImportantModal(
                <Terms
                  accept={() => {
                    console.log("accept");
                    closeModal();
                  }}
                  reject={() => {
                    console.log("reject");
                    closeModal();
                  }}
                />
              );
            }}
          >
            약관동의 모달창 띄우기
          </Button>
        </section>
      </>
    </main>
  );
}
