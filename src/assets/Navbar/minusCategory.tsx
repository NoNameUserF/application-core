import "./index.css";
import {FC} from "react";

interface ColoredIconMinusProps {
	color: string;
}

const ColoredIconMinus:FC<ColoredIconMinusProps> = ({ color }) => {
	return (
		<svg
			style={{ cursor: "pointer" }}
			className="colored-icon"
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path className="icon-path" d="M3.8501 8H12.1501" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};

export default ColoredIconMinus;
