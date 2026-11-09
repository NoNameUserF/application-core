import cn from "classnames/dedupe";

import styles from "./index.module.css";
import {FC} from "react";

interface GsuStepperProps {
	steps: string[];
	step: number;
}

const GsuStepper:FC<GsuStepperProps> = ({ steps, step }) => {
	const oneStepPercent = 100 / steps.length;

	return (
		<div className={cn(styles.cookingStepperContainer)}>
			<div className={cn(styles.cookingStepper)}>
				<div className={cn(styles.cookingStepperProgress)} style={{ width: `${oneStepPercent * (step + 1)}%` }}></div>
			</div>
		</div>
	);
};

export default GsuStepper;
