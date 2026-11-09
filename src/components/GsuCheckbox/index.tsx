import GsuCheckboxIcon from "./GsuCheckboxIcon";
import GsuCheckedIcon from "./GsuCheckedIcon";
import GsuIndeterminateIcon from "./GsuIndeterminateIcon";

import styles from "./index.module.css";
import {FC} from "react";

interface GsuCheckboxProps {
    checked: boolean;
    indeterminate: boolean;
    onChange: () => void;
}

const GsuCheckbox: FC<GsuCheckboxProps> = ({checked, indeterminate, onChange}) => {
    const handleChange = () => {
        onChange();
    };
    return (
        <div className={styles.checkboxIcon} onClick={handleChange} role="button">
            {indeterminate ? <GsuIndeterminateIcon/> : checked ? <GsuCheckedIcon/> : <GsuCheckboxIcon/>}
        </div>
    );
};

export default GsuCheckbox;
