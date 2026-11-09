import React, {FC, useState} from "react";
import ReactDOM from "react-dom";

import { isMobile } from "react-device-detect";

import styles from "./index.module.css";

let tooltipTimeout: NodeJS.Timeout | number | undefined = undefined;

interface GsuTooltipProps {
	text?: string | null;
	children: React.ReactNode;
	useOriginalEvents?: boolean,
	showInMobile?: boolean;
	timeout?: number;
}

interface TooltipState {
	isVisible: boolean;
	top: string;
	left: string;
	right: string;
	transform: string;
	arrowLeft: string;
	arrowTop: string;
	arrowRight: string;
	arrowTransform: string;
}

const GSUTooltip:FC<GsuTooltipProps> = ({ text, children, useOriginalEvents = true, showInMobile = true, timeout = 240 }) => {
	const [tooltipState, setTooltipState] = useState<TooltipState>({	isVisible: false,
																																		top: "0",
																																		left: "0",
																																		right: "0",
																																		transform: "",
																																		arrowLeft: "0",
																																		arrowTop: "0",
																																		arrowRight: "0",
																																		arrowTransform: "",
	});

	const calculatePosition = (left: number) => {
		let transform = null;
		let arrowTransform = null;
		let arrowLeft = "auto";
		let arrowTop = null;
		let arrowRight = "auto";

		if (left < window.innerWidth / 3) {
			transform = "translateX(0%)";
			arrowTransform = "translateX(-50%) rotate(40deg)";
			arrowTop = "75%";
			arrowLeft = "2px";
		} else if (left < (2 * window.innerWidth) / 3) {
			transform = "translateX(-50%)";
			arrowTransform = "translateX(-50%) rotate(0deg)";
			arrowTop = "85%";
			arrowLeft = "50%";
		} else {
			transform = "translateX(-100%)";
			arrowTransform = "translateX(200%) rotate(-40deg)";
			arrowTop = "75%";
			arrowRight = "28px";
		}

		return { transform, arrowTransform, arrowLeft, arrowTop, arrowRight };
	};

	const hide = () => {
		if (tooltipState.isVisible) {
			setTooltipState({
				...tooltipState,
				isVisible: false,
			});
		}
	};

	const show = (top: number, left: number) => {
		const gap = isMobile ? 100 : 40;
		const { transform, arrowTransform, arrowLeft, arrowTop, arrowRight } = calculatePosition(left);

		setTooltipState({
			...tooltipState,
			top: String(top - gap),
			left: String(left),
			transform: transform,
			arrowLeft: arrowLeft,
			arrowTop: arrowTop,
			arrowRight: arrowRight,
			arrowTransform: arrowTransform,
			isVisible: true,
		});
	};

	const handleMouseMove = (originalEvent?: (() => void)) => (e: React.MouseEvent) => {
		if (useOriginalEvents) {
			originalEvent && originalEvent();
		}
		if (isMobile) {
			return;
		}

		if (tooltipTimeout) {
			clearTimeout(tooltipTimeout);
		}

		hide();

		const top = e.clientY;
		const left = e.clientX;

		tooltipTimeout = setTimeout(() => {
			show(top, left);
		}, timeout);
	};

	const handleMouseLeave = (originalEvent?: (() => void)) => () => {
		if (tooltipTimeout) {
			clearTimeout(tooltipTimeout);
		}

		if (useOriginalEvents) {
			originalEvent && originalEvent();
		}

		if (isMobile) {
			return;
		}

		if (tooltipTimeout) {
			clearTimeout(tooltipTimeout);
		}

		hide();
	};

	const handleTouchStart = (originalEvent?: (() => void)) => (e: React.TouchEvent) => {
		if (useOriginalEvents) {
			originalEvent && originalEvent();
		}

		if (!isMobile || !showInMobile) {
			return;
		}

		if (e.targetTouches.length === 1) {
			const touchX = e.targetTouches[0].clientX;
			const touchY = e.targetTouches[0].clientY;

			tooltipTimeout = setTimeout(() => {
				show(touchY, touchX);
			}, timeout);
		}
	};

	const handleTouchEnd = (originalEvent?: (() => void)) => () => {
		clearTimeout(tooltipTimeout);
		if (useOriginalEvents) {
			originalEvent && originalEvent();
		}

		if (!isMobile || !showInMobile) {
			return;
		}

		hide();
	};

	return (
		<>
			{React.Children.map(children, (child: any) =>
				React.cloneElement(child, {
					onMouseMove: handleMouseMove(child.props.onMouseMove),
					onMouseLeave: handleMouseLeave(child.props.onMouseLeave),
					onTouchStart: handleTouchStart(child.props.onTouchStart),
					onTouchEnd: handleTouchEnd(child.props.onTouchEnd),
					onTouchCancel: handleTouchEnd(child.props.onTouchCancel),
				}),
			)}
			{tooltipState.isVisible &&
				text &&
				ReactDOM.createPortal(
					<div
						className={styles.tooltip}
						style={{
							top: `${tooltipState.top}px`,
							left: `${tooltipState.left}px`,
							transform: tooltipState.transform,
						}}>
						{text}
						<div
							className={styles.tooltipArrow}
							style={{
								left: tooltipState.arrowLeft,
								top: tooltipState.arrowTop,
								right: tooltipState.arrowRight,
								transform: tooltipState.arrowTransform,
							}}
						/>
					</div>,
					document.body,
				)}
		</>
	);
}

export default GSUTooltip;
