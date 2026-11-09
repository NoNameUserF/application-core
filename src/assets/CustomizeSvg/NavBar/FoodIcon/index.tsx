import styles from "../index.module.css";
import {FC} from "react";
import {NavBarIconProps} from "../../../../types/globalTypes";

export const FoodIcon:FC<NavBarIconProps> = ({ active }) => {
	return (
		<svg
			className={active ? styles.active : styles.default}
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<g clipPath="url(#clip0_1174_3586)">
				<path
					d="M3.33333 9.1665H16.6667C16.8877 9.1665 17.0996 9.2543 17.2559 9.41058C17.4122 9.56686 17.5 9.77882 17.5 9.99984V10.4165C17.5 11.6665 15.4025 15.0607 14.1667 15.8332V16.6665C14.1667 16.8875 14.0789 17.0995 13.9226 17.2558C13.7663 17.412 13.5543 17.4998 13.3333 17.4998H6.66667C6.44565 17.4998 6.23369 17.412 6.07741 17.2558C5.92113 17.0995 5.83333 16.8875 5.83333 16.6665V15.8332C4.4275 14.9548 2.5 11.6665 2.5 10.4165V9.99984C2.5 9.77882 2.5878 9.56686 2.74408 9.41058C2.90036 9.2543 3.11232 9.1665 3.33333 9.1665Z"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M15.4182 9.16667C15.7107 8.31917 15.7732 7.30333 15.8349 6.07167V5H13.9549C11.5965 5 10.1082 5.67 9.25488 6.73"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M4.37949 9.17317C4.26245 8.62224 4.19137 8.06254 4.16699 7.49984V6.6665H5.62949C6.44616 6.6665 7.13033 6.76984 7.69533 6.95817"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M6.66699 6.66683L7.50033 3.3335L10.8337 5.41683"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M10.8337 9.1665V8.74984C10.8337 8.1973 10.6142 7.6674 10.2235 7.2767C9.83276 6.886 9.30286 6.6665 8.75033 6.6665C8.19779 6.6665 7.66789 6.886 7.27719 7.2767C6.88649 7.6674 6.66699 8.1973 6.66699 8.74984V9.1665"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
			<defs>
				<clipPath id="clip0_1174_3586">
					<rect width="20" height="20" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};
