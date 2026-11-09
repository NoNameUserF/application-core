import styles from "../index.module.css";
import {FC} from "react";
import {NavBarIconProps} from "../../../../types/globalTypes";

export const HeatIcon:FC<NavBarIconProps> = ({ active }) => {
	return (
		<svg
			className={active ? styles.active : styles.default}
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M5.80537 8.11816C5.54688 7.55039 5.40802 6.93547 5.39746 6.31171C5.52013 5.26186 6.0241 4.29363 6.81369 3.59092C7.60328 2.88822 8.62346 2.5 9.68046 2.5C10.7375 2.5 11.7576 2.88822 12.5472 3.59092C13.3368 4.29363 13.8408 5.26186 13.9635 6.31171C13.9466 6.9347 13.8081 7.54837 13.5556 8.11816"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M5.16334 13.0702C4.18082 12.8924 3.29215 12.3747 2.65294 11.6076C2.01373 10.8406 1.66472 9.87309 1.667 8.87461C1.667 6.54372 3.24036 5.08691 5.57125 5.08691"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M13.7295 5.08691C16.1187 5.08691 17.692 6.54372 17.692 8.87461C17.6943 9.87309 17.3453 10.8406 16.7061 11.6076C16.0668 12.3747 15.1782 12.8924 14.1957 13.0702"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M5.16309 13.0708V17.4995H14.137V13.0708"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M5.16309 15.2852H14.137"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M9.65039 15.285V12.9541"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
