import styles from "../index.module.css";
import {FC} from "react";
import {NavBarIconProps} from "../../../../types/globalTypes";

export const HomeIcon:FC<NavBarIconProps> = ({ active }) => {
	return (
		<svg
			className={active ? styles.active : styles.default}
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M2.08301 9.11583C2.08301 8.09567 2.55016 7.13169 3.35086 6.49955L7.93419 2.88113C9.14522 1.92506 10.8541 1.92505 12.0652 2.88113L16.6485 6.49955C17.4492 7.13168 17.9163 8.09567 17.9163 9.11583V14.5838C17.9163 16.4248 16.424 17.9172 14.583 17.9172H13.333C12.8728 17.9172 12.4997 17.5441 12.4997 17.0838V14.5838C12.4997 13.6633 11.7535 12.9172 10.833 12.9172H9.16634C8.24587 12.9172 7.49967 13.6633 7.49967 14.5838V17.0838C7.49967 17.5441 7.12658 17.9172 6.66634 17.9172H5.41634C3.57539 17.9172 2.08301 16.4248 2.08301 14.5838L2.08301 9.11583Z"
				strokeWidth="1.5"
			/>
		</svg>
	);
};
