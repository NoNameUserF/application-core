import styles from "../index.module.css";
import {FC} from "react";
import {NavBarIconProps} from "../../../../types/globalTypes";

export const CartIcon:FC<NavBarIconProps> = ({ active }) => {
	return (
		<svg
			className={active ? styles.active : styles.default}
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<g clipPath="url(#clip0_1174_3596)">
				<path
					d="M3.33301 15.8332C3.33301 16.2752 3.5086 16.6991 3.82116 17.0117C4.13372 17.3242 4.55765 17.4998 4.99967 17.4998C5.4417 17.4998 5.86563 17.3242 6.17819 17.0117C6.49075 16.6991 6.66634 16.2752 6.66634 15.8332C6.66634 15.3911 6.49075 14.9672 6.17819 14.6547C5.86563 14.3421 5.4417 14.1665 4.99967 14.1665C4.55765 14.1665 4.13372 14.3421 3.82116 14.6547C3.5086 14.9672 3.33301 15.3911 3.33301 15.8332Z"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M12.5 15.8332C12.5 16.2752 12.6756 16.6991 12.9882 17.0117C13.3007 17.3242 13.7246 17.4998 14.1667 17.4998C14.6087 17.4998 15.0326 17.3242 15.3452 17.0117C15.6577 16.6991 15.8333 16.2752 15.8333 15.8332C15.8333 15.3911 15.6577 14.9672 15.3452 14.6547C15.0326 14.3421 14.6087 14.1665 14.1667 14.1665C13.7246 14.1665 13.3007 14.3421 12.9882 14.6547C12.6756 14.9672 12.5 15.3911 12.5 15.8332Z"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M14.1663 14.1667H4.99967V2.5H3.33301"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M5 4.1665L16.6667 4.99984L15.8333 10.8332H5"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
			<defs>
				<clipPath id="clip0_1174_3596">
					<rect width="20" height="20" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
