import cn from "classnames/dedupe";
import styles from "./index.module.css";
import React, {FC} from "react";

interface GsuTextButtonProps {
    onClick: () => void;
    text: string;
    additionalStyles?: string;
    disabled?: boolean;
}

const GsuTextButton: FC<GsuTextButtonProps> = ({
                                           onClick,
                                           text,
                                           additionalStyles,
                                           disabled
                                       }) => {

    return (
        <button disabled={disabled} className={cn(styles.button, additionalStyles)} onClick={onClick}>
          <h6 className={cn(styles.buttonText, {[styles.buttonTextDisabled]: disabled})}>{text}</h6>
        </button>
    );
};

export default GsuTextButton;