import {FC} from "react";
import styles from "./index.module.css";
import {ErrorIcon} from "../../assets/Icons";
import GsuButton from "../GsuButton";

interface GSUErrorComponentProps {
    label: string;
    text: string;
    description?: string;
    action: () => void
}

const GSUErrorComponent: FC<GSUErrorComponentProps> = ({label = "", text = "", description = "", action}) => {
    return (
        <div className={styles.errorContent}>
            <div className={styles.errorContentWrapper}>
                <ErrorIcon/>
                <h2 className={styles.errorContentHeaderText}>{text || "Произошла ошибка, мы работаем над ее устранением"}</h2>
                <p className={styles.errorContentDescription}>{description || ""}</p>
                <GsuButton text={label} onClick={action} btnClassName={styles.errorContentReload} style={"secondary"}/>
            </div>
        </div>
    );
};

export default GSUErrorComponent;
