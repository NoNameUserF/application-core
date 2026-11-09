import { FC } from "react";

import cn from "classnames/dedupe";

import styles from "../index.module.css";
import { CheckedIcon } from "../../../icons/Icons";
import {IOptions} from "../../../types/globalTypes";

interface GsuButtonSelectProps {
	options: IOptions;
	change: (keys: string[]) => void;
	values: string[];
	checkDefaultIfAllSelected?: boolean
}

const GsuButtonSelect: FC<GsuButtonSelectProps> = ({ options, change, values, checkDefaultIfAllSelected = true }) => {

	const handleOptionClick = (optionKey: string) => {
		let newSelectedOptions: string[];

		const defaultValue = Object.keys(options)[0];
		if (optionKey === defaultValue) {
			newSelectedOptions = [optionKey];
		} else {
			newSelectedOptions = values.includes(optionKey)
				? values.filter((key: string) => key !== optionKey)
				: [...values.filter((key: string) => key !== defaultValue), optionKey];
		}

		if (checkDefaultIfAllSelected) {
			const allSelectedExceptDefault = Object.keys(options)
				.filter((key) => key !== defaultValue)
				.every((key) => newSelectedOptions.includes(key));

			if (allSelectedExceptDefault) {
				newSelectedOptions = [defaultValue];
			}
		}
		if (newSelectedOptions.length === 0) {
			newSelectedOptions = [defaultValue];
		}

		change(newSelectedOptions);
	};

	return (
		<div className={styles.buttonSelectContainer}>
			{Object.entries(options).map(
				([key, item]) => (
					<div
						key={key}
						role="menuItem"
						onClick={() => handleOptionClick(key)}
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

export default GsuButtonSelect;
