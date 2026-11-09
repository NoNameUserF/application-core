import styles from "../index.module.css";
import {FC} from "react";
import {NavBarIconProps} from "../../../../types/globalTypes";

export const DrinkIcon:FC<NavBarIconProps> = ({ active }) => {
	return (
		<svg
			className={active ? styles.active : styles.default}
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<g clipPath="url(#clip0_1174_3606)">
				<path
					d="M7.5 17.5H12.5C12.721 17.5 12.933 17.4122 13.0893 17.2559C13.2455 17.0996 13.3333 16.8877 13.3333 16.6667V13.6458C13.3333 12.4817 13.575 11.3333 14.0375 10.2917L14.2958 9.70833C14.7592 8.66667 15 7.83083 15 6.66667V3.33333C15 3.11232 14.9122 2.90036 14.7559 2.74408C14.5996 2.5878 14.3877 2.5 14.1667 2.5H5.83333C5.61232 2.5 5.40036 2.5878 5.24408 2.74408C5.0878 2.90036 5 3.11232 5 3.33333V6.66667C5 7.83083 5.24167 8.66667 5.70417 9.70833L5.9625 10.2917C6.4287 11.3483 6.66856 12.4909 6.66667 13.6458V16.6667C6.66667 16.8877 6.75446 17.0996 6.91074 17.2559C7.06702 17.4122 7.27899 17.5 7.5 17.5Z"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path d="M5 6.6665H15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</g>
			<defs>
				<clipPath id="clip0_1174_3606">
					<rect width="20" height="20" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
