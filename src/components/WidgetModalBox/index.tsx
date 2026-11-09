import React, {FC, useEffect, useRef} from "react";
import cn from "classnames/dedupe";

import styles from "./index.module.css";
import {lockWidgetScroll, unlockWidgetScroll} from "../../utils/widgetUtils";

interface WidgetModalBoxProps {
    children: React.ReactNode;
    open: boolean;
    setOpen: (value: boolean) => void;
}

const WidgetModalBox:FC<WidgetModalBoxProps> = ({children, open, setOpen}) => {
    const modalRef = useRef(null);

    const closeModal = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            if (window.innerWidth <= 880) {
                lockWidgetScroll();
            }
        } else {
            unlockWidgetScroll();
        }
        return () => {
            unlockWidgetScroll()
        }
    }, [open]);

    return (
        <div className={cn(styles.modalOverlay, {[styles.open]: open})} onClick={closeModal} role="button">
            <div
                className={cn(styles.modalWrapper, {[styles.open]: open} , styles.modalWrapperForMobileAutocomplete)}
                onClick={(e) => e.stopPropagation()}
                ref={modalRef}
                role="button">
                <div className={styles.modalContent}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default WidgetModalBox;
