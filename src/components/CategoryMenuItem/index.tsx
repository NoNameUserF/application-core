import cn from "classnames/dedupe";
import {Link, useLocation} from "react-router-dom";

import GSUTooltip from "../GsuTooltip";

import styles from "./index.module.css";
import {FC} from "react";
import {IRoute} from "../../types/globalTypes";
import GsuStaticTooltip from "../GsuStaticTooltip";


interface CategoryMenuItemProps {
    categoryKey?: string;
    setIsCollapsedSidebar: (value: boolean) => void;
    isCollapsedSidebar: boolean;
    route: IRoute;
    isMobileNavbar: boolean;
}

export const CategoryMenuItem:FC<CategoryMenuItemProps> = ({
                                     categoryKey,
                                     setIsCollapsedSidebar,
                                     isCollapsedSidebar,
                                     route,
                                     isMobileNavbar
                                 }) => {
    const location = useLocation();

    const isActive = route.path === location.pathname;


    function reload() {
        if (!isActive) {
            return
        }

        window.location.href = location.pathname

    }

    function handleLinkTransition() {
        if (isMobileNavbar) {
            setIsCollapsedSidebar(true);
        }
    }

    return (
        <li key={categoryKey} className={cn(styles.categoryMenuItemWrap)} onClick={reload}>
            <GsuStaticTooltip position={'right'} text={!isMobileNavbar && isCollapsedSidebar ? route.name : null}>
				<span key={route.path} className={cn(styles.categoryItemWrap)}>
					<Link
                        className={cn(styles.categoryItemWrap__linkItem, {
                            [styles["active"]]: isActive,
                        })}
                        to={route.path}
                        onClick={handleLinkTransition}>
						{isCollapsedSidebar ? (
                            <>{route.icon({active: isActive})}</>
                        ) : (
                            <>
                                {route.icon({active: isActive})}
                                {route.name}
                            </>
                        )}
					</Link>
				</span>
            </GsuStaticTooltip>
        </li>
    );
}
