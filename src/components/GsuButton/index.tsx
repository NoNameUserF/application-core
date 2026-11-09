import cn from "classnames/dedupe";
import styles from "./index.module.css";
import React, {FC} from "react";

interface GsuButtonProps {
    style: 'primary' | 'secondary' | 'outline' | 'destructive';
    onClick: () => void;
    text: string;
    Icon?: FC;
    iconPosition?: 'left' | 'right'
    disabled?: boolean;
    btnClassName?: string;
    textClassName?: string;
    iconClassName?: string;
}

const GsuButton: FC<GsuButtonProps> = ({
                                           onClick,
                                           text,
                                           Icon,
                                           btnClassName,
                                           textClassName,
                                           iconClassName,
                                           iconPosition,
                                           disabled = false,
                                           style,
                                       }) => {

    const getBtnStyle = (): string => {
        switch (style) {
            case 'primary':
                return styles.primary;
            case 'secondary':
                return styles.secondary;
            case 'outline':
                return styles.outline;
            case 'destructive':
                return styles.destructive;
            default:
                return "";
        }
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(styles.button, getBtnStyle(), btnClassName)}
        >
            <div className={styles.btnInner}>

                {(Icon && (!iconPosition || iconPosition === "left")) ?
                    <div className={cn(styles.icon, iconClassName)}><Icon/></div> : null}

                {text && <h6 className={cn(styles.textNormal,
                    {[styles.textOutline]: style === 'outline' && !disabled},
                    {[styles.textDisabled]: disabled},
                    textClassName
                )}>{text}</h6>}

                {(Icon && (iconPosition && iconPosition === "right")) ?
                    <div className={cn(styles.icon, iconClassName)}><Icon/></div> : null}

            </div>
        </button>
    );
};

export default GsuButton;
