import GSUTooltip from "../GsuTooltip";
import styles from "./index.module.css";
import {FC} from "react";

interface GsuRadioButton {
	checked: boolean;
	onCheck?: () => void;
}

const GsuRadioButton:FC<GsuRadioButton> = ({checked, onCheck = () => {} }) => {
	return (
		<GSUTooltip>
			<div className={styles.customCheckbox}>
				<div className={styles.customCheckboxWrapper}>
					<input
						className={styles.tableRowInput}
						checked={checked}
						type="checkbox"
						onChange={onCheck}
					/>
					<span className={styles.checkmark} />
				</div>
			</div>
		</GSUTooltip>
	);
};

export default GsuRadioButton;
