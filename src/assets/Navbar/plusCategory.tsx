import "./index.css";
import {FC} from "react";

interface ColoredIconProps {
	color: string;
}

const ColoredIcon:FC<ColoredIconProps> = ({ color }) => {
	return (
		<svg
			className="colored-icon"
			width="20"
			height="20"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{ cursor: "pointer" }}>
			<path
				className="icon-path"
				d="M8 3.99609V11.9961M12 7.99609H4"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default ColoredIcon;
