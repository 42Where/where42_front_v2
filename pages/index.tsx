import React, { useCallback } from "react";
import useModalStore from "@/stores/useModalStore";
import useDropdownStore from "@/stores/useDropdownStore";
import IconTextButton from "@/atoms/buttons/IconButton/IconTextButton";
import IconButton from "@/atoms/buttons/IconButton/IconButton";

import XIcon from "&/Icons/cross.svg";
import MenuIcon from "&/Icons/burgerMenu.svg";

export default function Home() {
  const { openModal, openImportantModal, closeModal } = useModalStore();
  const { openDropdown, closeDropdown } = useDropdownStore();

  const DropdownCellClickHandler = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      closeDropdown();
    },
    [closeDropdown]
  );

  const dropdownClickHandler = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      openDropdown(
        [
          {
            text: "첫번째",
            onClick: DropdownCellClickHandler,
          },
          {
            text: "두번째",
            onClick: DropdownCellClickHandler,
          },
          {
            text: "세번째",
            isDanger: true,
            onClick: DropdownCellClickHandler,
          },
        ],
        {
          top: e.pageY,
          left: e.pageX,
        },
        "large"
      );
    },
    [openDropdown, DropdownCellClickHandler]
  );

  return (
    <main>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <section>
          <button
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              openModal(<div>모달창</div>);
            }}>
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
                  onClick={closeModal}>
                  <IconButton Icon={XIcon} size="medium" />
                </IconTextButton>
              );
            }}>
            중요한 모달창 띄우기
          </button>
        </section>
        <br />
        <br />
        <section>
          <IconButton
            Icon={MenuIcon}
            size="medium"
            onClick={dropdownClickHandler}
          />
          <br />
          <br />
        </section>
      </div>
    </main>
  );
}
