import { FC } from "react";

import cn from "classnames/dedupe";

import styles from "../index.module.css";
import { CheckedIcon } from "../../../icons/Icons";
import {IOptions} from "../../../types/globalTypes";

interface GsuButtonMultiSelectProps {
	options: IOptions;
	change: (keys: string[]) => void;
	values: string[];
}

const GsuButtonMultiSelect: FC<GsuButtonMultiSelectProps> = ({ options, change, values }) => {

	const handleChange = (key: string) => {
		const newValues = [...values];
		const idx = newValues.indexOf(key);
		if (idx >= 0) {
			newValues.splice(idx, 1);
		} else {
			newValues.push(key);
		}

		change(newValues)
	}

	return (
		<div className={styles.buttonSelectContainer}>
			{Object.entries(options).map(
				([key, item]) => (
					<div
						key={key}
						role="menuItem"
						onClick={() => handleChange(key)}
						className={cn(
							styles.buttonSelectItem,
							values.includes(key) && styles.buttonSelectItemActive,
						)}
					>
						<div
							className={cn(
								styles.buttonSelectCheckedIcon,
								values.includes(key) &&
								styles.buttonSelectCheckedIconActive,
							)}
						>
							<CheckedIcon />
						</div>
						{item.Icon && (
							<div className={styles.buttonSelectIcon}>
								<item.Icon />
							</div>
						)}
						<p className={styles.buttonSelectItemText}>{item.label}</p>
					</div>
				)
			)}
		</div>
	);
};

export default GsuButtonMultiSelect;
