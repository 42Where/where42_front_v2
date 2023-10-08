import Image from "next/image";
import { Inter } from "next/font/google";
import useModalStore from "@/stores/useModalStore";
import IconTextButton from "@/atoms/buttons/IconButton/IconTextButton";
import IconButton from "@/atoms/buttons/IconButton/IconButton";

import XIcon from "&/Icons/cross.svg";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { openModal, openImportantModal, closeModal } = useModalStore();

  return (
    <main>
      <section>
        <button
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            openModal(<div>모달창</div>);
          }}
        >
          모달창 띄우기
        </button>
        <br />
        <br />
        <button
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            openImportantModal(
              <IconTextButton
                text="바깥이 아니라 안쪽을 눌러야 닫힙니다"
                size="medium"
                onClick={closeModal}
              >
                <IconButton Icon={XIcon} size="medium" />
              </IconTextButton>
            );
          }}
        >
          중요한 모달창 띄우기
        </button>
      </section>
    </main>
  );
}
