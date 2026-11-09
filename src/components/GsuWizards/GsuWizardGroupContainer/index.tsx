import styles from './index.module.css'
import React, {FC, ReactNode} from "react";

interface GsuWizardGroupContainerProps {
    children?: ReactNode
    onKeyDown?: (event: React.KeyboardEvent) => void
}

export const GsuWizardGroupContainer: FC<GsuWizardGroupContainerProps> = ({
                                                                              children,
                                                                              onKeyDown
                                                                          }) => {
    return (
        <div onKeyDown={onKeyDown}
             className={styles.gsuWizardGroupContainer}>
            {children}
        </div>
    )
};

export default GsuWizardGroupContainer;