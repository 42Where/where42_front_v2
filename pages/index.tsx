import { Button } from "antd";
import useModalStore from "@/stores/useModalStore";
import Terms from "@/atoms/Terms/Terms";

export default function Home() {
  const { openModal, openImportantModal, closeModal } = useModalStore();

  return (
    <main>
			<Button type="primary">버튼</Button>
			<Button type="primary" danger>버튼</Button>
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
    </main>
  );
}
