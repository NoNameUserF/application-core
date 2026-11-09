import { FC } from "react";

import cn from "classnames/dedupe";

import styles from "../index.module.css";
import { CheckedIcon } from "../../../icons/Icons";
import {IOptions} from "../../../types/globalTypes";

interface GsuButtonSingleSelectProps {
	options: IOptions;
	change: (key: string) => void;
	value: string;
}

const GsuButtonSingleSelect: FC<GsuButtonSingleSelectProps> = ({ options, change, value }) => {

	return (
		<div className={styles.buttonSelectContainer}>
			{Object.entries(options).map(
				([key, item]) => (
					<div
						key={key}
						role="menuItem"
						onClick={() => change(key)}
						className={cn(
							styles.buttonSelectItem,
							value === key && styles.buttonSelectItemActive,
						)}
					>
						<div
							className={cn(
								styles.buttonSelectCheckedIcon,
								value === key &&
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

export default GsuButtonSingleSelect;
