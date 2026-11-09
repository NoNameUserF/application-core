import {FC, useState} from "react";

import {GsuSelectCount} from "../GsuSelectCount";
import GsuWizardSectionHeader from "../GsuWizards/GsuWizardSectionInfo";

import styles from "./index.module.css";
import {WishPeopleIcon} from "../../assets/Icons";

interface GsuPeopleSelectProps {
    change: (value: number) => void;
    value: number;
    descriptionText: string;
    maxCount?: number;
    minCount?: number;
    Icon?: FC
}

const GsuWizardSelectCount: FC<GsuPeopleSelectProps> = ({
                                                            change,
                                                            value,
                                                            descriptionText,
                                                            Icon,
                                                            maxCount = 12,
                                                            minCount = 1
                                                        }) => {

    const increaseValue = () => {
        const newValue = value + 1;
        if (newValue <= maxCount) {
            change(newValue);
        }
    };

    const decreaseCount = () => {
        const newValue = value - 1;
        if (newValue >= minCount) {
            change(newValue);
        }
    };

    return (
        <div className={styles.wizardSelectCountContainer}>
            <GsuWizardSectionHeader Icon={Icon} descriptionText={descriptionText}/>
            <GsuSelectCount
                maxCount={maxCount}
                minCount={minCount}
                decreaseCount={decreaseCount}
                increaseCount={increaseValue}
                count={value}
            />
        </div>
    );
};


export default GsuWizardSelectCount;
