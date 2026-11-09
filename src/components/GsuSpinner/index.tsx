import styles from "./index.module.css";
import {FC} from "react";
import {GsuSpinnerProps} from "../../types/globalTypes";

const GsuSpinner:FC<GsuSpinnerProps> = ({ spinnerWeight = 15, color = "var(--color-primary)" }) => {
	const svgWidth = 100;
	const radius = svgWidth / 2 - spinnerWeight / 2;
	const circumference = 2 * Math.PI * radius;

	return (
		<div className={styles.spinnerWrapper}>
			<div className={styles.spinner}>
				<svg className={styles.spinnerRunner} viewBox={`0 0 ${svgWidth} ${svgWidth}`}>
					<circle
						cx={svgWidth / 2}
						cy={svgWidth / 2}
						r={radius}
						fill="none"
						stroke={color}
						strokeLinecap="round"
						strokeWidth={spinnerWeight}
						strokeDasharray={`${circumference / 4} ${(circumference / 4) * 3}`}></circle>
				</svg>
				<svg className={styles.spinnerCircle} viewBox={`0 0 ${svgWidth} ${svgWidth}`}>
					<circle
						cx={svgWidth / 2}
						cy={svgWidth / 2}
						r={svgWidth / 2 - spinnerWeight / 2}
						fill="none"
						stroke={color}
						strokeLinecap="round"
						strokeWidth={spinnerWeight}></circle>
				</svg>
			</div>
		</div>
	);
};

export default GsuSpinner;
