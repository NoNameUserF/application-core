import GsuButton from "../../GsuButton";
import GsuModal from "../GsuModal";

import styles from "./index.module.css";
import {FC} from "react";
import {IFinishModal} from "../../../types/globalTypes";

interface GsuDefaultWizardFinishModalProps extends IFinishModal<unknown> {
    Emoji: FC;
    header: string;
    msg: string;
    btnText: string;
}

export const GsuDefaultWizardFinishModal: FC<GsuDefaultWizardFinishModalProps> = ({
                                                                                      finishWizard,
                                                                                      openModal,
                                                                                      setOpenModal,
                                                                                      Emoji,
                                                                                      header,
                                                                                      msg,
                                                                                      btnText,
                                                                                  }) => {
    return (
        <GsuModal openModal={openModal} setOpenModal={setOpenModal}>
            <div className={styles.modalContainer}>
                <div className={styles.displayModal_emoji}>
                    {Emoji && <Emoji/>}
                </div>
                <h2 className={styles.displayModal_title}>{header}</h2>
                <p className={styles.displayModal_text}>
                    {msg}
                </p>
                <div className={styles.modalEnjoyButtonsContainer}>
                    <GsuButton
                        text={btnText}
                        onClick={() => setOpenModal(false)}
                        btnClassName={styles.modalBack}
                        style={"outline"}></GsuButton>
                    <GsuButton
                        text={"В начало"}
                        onClick={finishWizard}
                        btnClassName={styles.modalToMain}
                        style={"primary"}></GsuButton>
                </div>
            </div>
        </GsuModal>
    );
};

export default GsuDefaultWizardFinishModal;
