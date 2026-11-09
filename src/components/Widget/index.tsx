import {FC, useEffect} from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import cn from "classnames/dedupe";

import Page404 from "../../pages/Page404/Page404";

import { scrollWidgetToTop } from "../../utils/widgetUtils";

import styles from "./index.module.css";
import {IRoute} from "../../types/globalTypes";

interface WidgetProps {
	router: IRoute[];
	img404src: string;
}

const Widget:FC<WidgetProps> = ({ router, img404src }) => {
	const GsuRouterWidget = router ?? false;
	const location = useLocation();

	useEffect(() => {
		scrollWidgetToTop();
	}, [location]);

	return (
		<div id={"gsu-widget"} className={cn(styles.gsuWidget)}>
			{GsuRouterWidget ? (
				<Routes>
					{router.map((category) => (
						<Route key={category.name} path={category.path} element={<category.component />} />
					))}
					<Route path={"*"} element={<Page404 image={img404src} />} />
				</Routes>
			) : (
				"Your Widget"
			)}
		</div>
	);
};

export default Widget;
