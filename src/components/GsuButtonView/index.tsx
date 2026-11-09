import {FC} from "react";
import {IOptions} from "../../types/globalTypes";
import {CloseIconBlack} from "../../icons/Icons";
import styles from "./index.module.css";

interface GsuButtonViewProps {
    options: IOptions;
    onDeleteOption: (key: string) => void;
}

const GsuButtonView: FC<GsuButtonViewProps> = ({options, onDeleteOption}) => {
    return (
        <div className={styles.btnViewContainer}>
            {Object.entries(options).map(([key, value], index) => <div key={index}
                                                                       className={styles.btnViewItem}>
                {(value.Icon && typeof value.Icon === "string") && value.Icon}
                <p className={styles.btnViewLabel}>{value.label}</p>
                <div onClick={() => onDeleteOption(key)}>
                    <div className={styles.btnViewCloseIcon}>
                        <CloseIconBlack/>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default GsuButtonView;