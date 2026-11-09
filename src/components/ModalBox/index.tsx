import {FC, ReactNode, useEffect, useRef} from "react";
import cn from "classnames/dedupe";
import styles from "./index.module.css";
import { CloseMainModalIcon } from "../../assets/Icons";
import {lockWidgetScroll, unlockWidgetScroll} from "../../utils/widgetUtils";

interface ModalBoxProps {
  children?: ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ModalBox: FC<ModalBoxProps> = ({ children, open, setOpen }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      lockWidgetScroll();
    } else {
      unlockWidgetScroll();
    }

    return () => {
      unlockWidgetScroll()
    }
  }, [open]);


  const closeModal = () => setOpen(false);

  return (
    <div
      className={cn(styles.modalOverlay, { [styles.open]: open })}
      onMouseDown={closeModal}     
      role="button"
    >
      <div
        className={cn(styles.modalWrapper, { [styles.open]: open })}
        onMouseDown={(e) => e.stopPropagation()} 
        ref={modalRef}
        role="button"
      >
        <div className={styles.modalContent}>
          <button className={styles.closeModalButton} onClick={closeModal}>
            <CloseMainModalIcon/>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalBox;