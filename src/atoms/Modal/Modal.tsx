import useModalStore from "@/stores/useModalStore";
import styles from "./Modal.module.scss";
import { useCallback } from "react";

const Modal = () => {
  const { isOpen, isImportant, children, closeModal } = useModalStore();

  const backgroundClickHandler = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      closeModal();
    },
    [closeModal]
  );

  return isOpen ? (
    <div
      className={styles.modal}
      onClick={isImportant ? undefined : backgroundClickHandler}
    >
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
