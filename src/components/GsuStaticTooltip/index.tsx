import React, { FC, useState, useRef, useLayoutEffect, useEffect } from "react";
import ReactDOM from "react-dom";

import { isMobile } from "react-device-detect";

import styles from "./index.module.css";
import cn from "classnames/dedupe";

let tooltipTimeout: NodeJS.Timeout | number | undefined = undefined;

type IPosition = "right" | "left" | "top-left" | "top-center"
	| "top-right" | "bot-left" | "bot-center" | "bot-right"

interface GsuTooltipProps {
	text?: string | null;
	children: React.ReactNode;
	useOriginalEvents?: boolean,
	timeout?: number;
	position: IPosition
}

interface TooltipState {
	isVisible: boolean;
	top: string,
	left: string,
	right: string
	transform : string

}

const GSUTooltip: FC<GsuTooltipProps> = ({
																					 text,
																					 children,
																					 useOriginalEvents = true,
																					 timeout = 240,
																					 position = "right",
																				 }) => {
	const [tooltipState, setTooltipState] = useState<TooltipState>({
		isVisible: false,
		top: "0",
		left: "0",
		right: "0",
		transform: "0",
	});
	const [tooltipWidth, setTooltipWidth] = useState<number>(0);
	const tooltipRef = useRef<HTMLDivElement | null>(null)
	const[showOpacity , setShowOpacity] = useState(false)

	useLayoutEffect(() => {
		if (tooltipState.isVisible && tooltipRef.current) {
			setTooltipWidth(tooltipRef.current!.offsetWidth);
		}
	}, [tooltipState.isVisible]);


	const hide = () => {
		if (tooltipState.isVisible) {
			setTooltipState({
				...tooltipState,
				isVisible: false,
			});
			setShowOpacity(false)
		}
	};



	const show = (yAxisOffset: number,  left: number , elementWidth : number  ,elementXEndCoordinate : number , elementVerticalOffset: number) => {
		switch (position) {
			case "left" :
				setTooltipState({
					...tooltipState,
					top: String(Math.ceil((yAxisOffset))),
					left: String(left - tooltipWidth),
					transform : 'translateX(-10%)',
					isVisible: true,
				});
				break;
			case "right" :
				setTooltipState({
					...tooltipState,
					top: String(Math.ceil((yAxisOffset)) ),
					left: String(elementXEndCoordinate),
					transform : 'translateX(10%)',
					isVisible: true,
				});
				break;
			case "top-center":
				setTooltipState({
					...tooltipState,
					top: String(-(elementVerticalOffset/2)),
					left: String(left  + elementWidth/2 ),
					transform : `translateX(-${tooltipWidth/2}px)`,
					isVisible: true,
				});
				break;
			case "top-left":
				setTooltipState({
					...tooltipState,
					top: String(-(elementVerticalOffset/2)),
					left: String(left  + elementWidth/2 ),
					transform : `translateX(-${tooltipWidth/2}px)`,
					isVisible: true,
				});
				break;
			case "top-right":
				setTooltipState({
					...tooltipState,
					top: String(-(elementVerticalOffset/2)),
					left: String(left  + elementWidth/2 ),
					transform : `translateX(-${tooltipWidth/2}px)`,
					isVisible: true,
				});
				break;

			case "bot-center" :
				setTooltipState({
					...tooltipState,
					top: String(Math.ceil((elementVerticalOffset * 2))),
					left: String(left  + elementWidth/2 ),
					transform : `translateX(-${tooltipWidth/2}px)`,
					isVisible: true,
				});
				break
			case "bot-left" :
				setTooltipState({
					...tooltipState,
					top: String(Math.ceil((elementVerticalOffset * 2))),
					left: String(left),
					isVisible: true,
				});
				break;
			case "bot-right" :
				setTooltipState({
					...tooltipState,
					top: String(Math.ceil((elementVerticalOffset * 2))),
					left: String(elementXEndCoordinate),
					transform : `translateX(-${tooltipWidth}px)`,
					isVisible: true,
				});
				break;
			default:
				break;
		}
	};

	const handleMouseMove = (originalEvent?: (() => void)) => (e: React.MouseEvent) => {
		if (useOriginalEvents) {
			originalEvent && originalEvent();
		}

		if (tooltipTimeout) {
			clearTimeout(tooltipTimeout);
		}

		if(isMobile) {
			return
		}

		hide();


		const yAxisOffset = e.currentTarget.getBoundingClientRect().y;
		const elementVerticalOffset = e.currentTarget.getBoundingClientRect().height;
		const elementWidth =e.currentTarget.getBoundingClientRect().width;
		const left = e.currentTarget.getBoundingClientRect().left;
		const elementXEndCoordinate = e.currentTarget.getBoundingClientRect().right


		show(yAxisOffset, left ,elementWidth ,elementXEndCoordinate , elementVerticalOffset)
		tooltipTimeout = setTimeout(() => {
			setShowOpacity(true)
		}, timeout);
	};

	const handleMouseLeave = (originalEvent?: (() => void)) => () => {
		if (tooltipTimeout) {
			clearTimeout(tooltipTimeout);
		}

		if (useOriginalEvents) {
			originalEvent && originalEvent();
		}


		if (tooltipTimeout) {
			clearTimeout(tooltipTimeout);
		}

		hide();
	};


	return (
		<>
			{React.Children.map(children, (child: any) =>
				React.cloneElement(child, {
					onMouseMove: handleMouseMove(child.props.onMouseMove),
					onMouseLeave: handleMouseLeave(child.props.onMouseLeave),
				}),
			)}
			{tooltipState.isVisible &&
				text &&
				ReactDOM.createPortal(
					<div
						ref={tooltipRef}
						className={styles.tooltip}
						style={{
							top: `${tooltipState.top}px`,
							left: `${tooltipState.left}px`,
							transform :`${tooltipState.transform}`,
							opacity : showOpacity ? 1 : 0
						}}>
						{text}
						<div
							className={cn(styles.tooltipArrow, styles[position])}
						/>
					</div>,
					document.body,
				)}
		</>
	);
};

export default GSUTooltip;
