import GsuModal from "../GsuModal";
import {FC} from "react";
import styles from "./index.module.css";
import {ErrorIcon} from "../../../assets/Icons";
import GsuButton from "../../GsuButton";

interface GsuDefaultErrorModalProps {
    btnLabel: string;
    header?: string;
    description?: string;
    action: () => void;
    setOpenModal: (value: boolean) => void;
    openModal: boolean;
}

export const GsuDefaultErrorModal: FC<GsuDefaultErrorModalProps> = ({
                                                                        btnLabel = "",
                                                                        header = "",
                                                                        description = "",
                                                                        action,
                                                                        setOpenModal,
                                                                        openModal
                                                                    }) => {
    return (
        <GsuModal openModal={openModal} setOpenModal={setOpenModal}>
            <div className={styles.errorContent}>
                <div className={styles.errorContentWrapper}>
                    <div className={styles.errorIcon}>
                        <ErrorIcon/>
                    </div>
                    <h2 className={styles.errorContentHeaderText}>{header || "Произошла ошибка, мы работаем над ее устранением"}</h2>
                    <p className={styles.errorContentDescription}>{description || ""}</p>
                    <GsuButton text={btnLabel} btnClassName={styles.errorContentReload} onClick={action}
                               style={"secondary"}/>
                </div>
            </div>
        </GsuModal>
    );
};

export default GsuDefaultErrorModal;
