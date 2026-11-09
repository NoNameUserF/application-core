import cn from 'classnames/dedupe'
import styles from "./index.module.css";
import React, {FC} from "react";

interface GsuWizardSectionProps {
	descriptionText?: string;
	Icon?: FC;
}

const GsuWizardSectionHeader:FC<GsuWizardSectionProps> = ({ descriptionText, Icon}) => {
	return (
		<div className={styles.multiSelectDescription}>
			{Icon && <Icon/>}
			{descriptionText && <h6 className={cn(styles.multiSelectText , {[styles.multiSelectTextWithoutImg] : !Icon})}>{descriptionText}</h6>}
		</div>
	);
};

export default GsuWizardSectionHeader;
