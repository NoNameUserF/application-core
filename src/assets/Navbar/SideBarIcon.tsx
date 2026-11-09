import { FC } from "react";

interface InfoBlockIconProps {
	hover: boolean;
}

export const SideBarIcon: FC<InfoBlockIconProps> = ({ hover }) => {
	return (
		<svg width="9" height="26" viewBox="0 0 9 26" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M8 25L2.76355 16.0232C1.67378 14.155 1.67378 11.8449 2.76355 9.97677L8 1"
				stroke={hover ? "var(--color-secondary-text)" : "var(--color-main-border)" }
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
