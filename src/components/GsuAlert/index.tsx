import {FC} from "react";
import {createRoot} from "react-dom/client";

import {CloseIcon} from "../../assets/Icons";

import styles from "./index.module.css";

interface GsuAlertProps {
    unmount: () => void;
    text: string;
}

interface GsuAlertOptions {
    sound?: string;
    containerID?: string
}

const GsuAlert: FC<GsuAlertProps> = ({unmount, text}) => {
    return (
        <div className={styles.gsuAlert}>
            <p className={styles.gsuAlertText}>{text}</p>
            <button onClick={unmount} className={styles.gsuAlertClose}>
                <CloseIcon/>
            </button>
        </div>
    );
};

const showGsuAlert = (text: string, hasSound = true, timeout = 5000, options?: GsuAlertOptions) => {
    const parentContainerID = options && options.containerID ? options.containerID : "gsu-widget";
    const parentContainer: HTMLElement | null = document.getElementById(parentContainerID);
    if (parentContainer !== null && parentContainer.children.length > 0) {
        const lastChild = parentContainer.children[parentContainer.children.length - 1];
        if (lastChild.id === `gsu-alert-container-${parentContainerID}`) {
            parentContainer.removeChild(lastChild);
        }
    }

    const alertContainer = document.createElement("div");
    alertContainer.id = `gsu-alert-container-${parentContainerID}`;
    alertContainer.className = styles.gsuAlertContainer;
    if (parentContainer) {
        parentContainer.appendChild(alertContainer);
    }

    const root = createRoot(alertContainer);

    const clear = () => {
        if (parentContainer && parentContainer.contains(alertContainer)) {
            parentContainer.removeChild(alertContainer);
        }
    };

    const unmount = () => {
        root.unmount();
        clear();
    };

    root.render(<GsuAlert text={text} unmount={unmount}/>);

    setTimeout(() => {
        unmount();
    }, timeout);
};

export default showGsuAlert;
