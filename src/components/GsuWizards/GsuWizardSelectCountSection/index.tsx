import {FC, ReactNode} from "react";
import styles from "./index.module.css";

interface GsuWizardSelectCountSectionProps {
    children?: ReactNode
}

const GsuWizardSelectCountSection: FC<GsuWizardSelectCountSectionProps> = ({children}) => {
    return (
        <div className={styles.wizardSelectCountSection}>
            {children}
        </div>
    )
}

export default GsuWizardSelectCountSection;