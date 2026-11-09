import React, {FC, ReactNode, useEffect, useRef} from "react";

import {CloseIcon, CloseModalIcon} from "../../../assets/Icons";

import styles from "./index.module.css";
import {lockWidgetScroll, unlockWidgetScroll} from "../../../utils/widgetUtils";

interface GsuModalProps {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    children: ReactNode;
}

const GsuModal: FC<GsuModalProps> = ({openModal, setOpenModal, children}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (openModal) {
            lockWidgetScroll();
        } else {
            unlockWidgetScroll();
        }

        return () => {
            unlockWidgetScroll()
        }
    }, [openModal]);

    const closeModal = () => {
        setOpenModal(false);
    };

    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            closeModal();
        }
    };

    return (
        <>
            {openModal && (
                <div onClick={handleOutsideClick} className={styles.gsuModalContainer} role="button">
                    <div ref={modalRef} className={styles.gsuModalWrapper}>
                        <div className={styles.gsuModalCloseBtn} onClick={closeModal} role="button">
                            <CloseModalIcon/>
                        </div>

                        <div className={styles.gsuModalContent}>
                            <div className={styles.displayModal}>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GsuModal;