import {FC, useState} from "react";

import styles from "./index.module.css";
import GsuRadioButton from "../GsuRadioButton";
import {IOption, IOptions} from "../../types/globalTypes";

interface GsuRadioButtonGroupProps {
	options?: IOptions;
	value: string;
	change: (key: string) => void;
}

export const GsuRadioButtonGroup:FC<GsuRadioButtonGroupProps> = ({ options, value, change }) => {

	const handleOptionClick = (key: string) => {
        change(key);
	};

	if (!options) {
		options = {
			"YES": {label: "да"},
			"NO": {label: "нет"}
		}
	}

	return (
		<div>
			<div className={styles.radioButtonsWrapper}>
				{Object.entries(options).map(([key, option]) => {
					return (
						<div
							key={key}
							onClick={() => handleOptionClick(key)}
							className={styles.radioButtonSelectItem}>
							<GsuRadioButton checked={value === key} />
							<p className={styles.radioButtonSelectText}>{option.label}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
