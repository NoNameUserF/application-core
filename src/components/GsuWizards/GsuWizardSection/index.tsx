import GsuWizardSectionHeader from "../GsuWizardSectionInfo";
import GsuMultiSelectInfo from "../GsuWizardSectionInfo";
import GsuSeparator from "../../GsuSeparator";
import styles from "./index.module.css";
import GsuInfoBlock from "../../GsuInfoBlock";
import React, {FC, ReactNode} from "react";

interface GsuWizardSectionProps {
    children?: ReactNode;
    Icon?: FC;
    descriptionText?: string;
    helperText?: string;
    separator? : boolean
}

const GsuWizardSection:FC<GsuWizardSectionProps> = ({children, Icon, descriptionText, helperText , separator = true ,}) => {
    return (
        <div className={styles.styledTextFieldMultiselect}>
            {descriptionText && <div className={styles.styledTextFieldMultiselectWrapper}>
                <GsuWizardSectionHeader Icon={Icon} descriptionText={descriptionText}/>
                {helperText && <div className={styles.gsuInfoBlockWrapper}>
                    <GsuInfoBlock position={'right'}
                           text={helperText}/>
                </div>}
            </div>}
            {children}
          <GsuSeparator separator={separator}></GsuSeparator>
        </div>
    );
};

export default GsuWizardSection;
