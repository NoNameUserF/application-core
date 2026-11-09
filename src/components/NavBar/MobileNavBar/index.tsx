import cn from "classnames/dedupe";

import {CategoryMenuItem} from "../../CategoryMenuItem";
import styles from "./index.module.css";
import {IRoute} from "../../../types/globalTypes";
import {FC} from "react";

interface MobileNavBarProps {
    router: IRoute[];
    collapsedMobileNavbar: boolean;
    setCollapsedMobileNavbar: (collapsedMobileNavbar: boolean) => void;
}

const MobileNavBar: FC<MobileNavBarProps> = ({router, collapsedMobileNavbar, setCollapsedMobileNavbar}) => {
    const getCollapsedStyleName = (firstStyleName: string, secondStyleName: string) => {
        return cn(styles[`${firstStyleName}`], {[styles[`${secondStyleName}`]]: collapsedMobileNavbar});
    };

    const clickMobileNavbar = (navbarState: boolean) => {
        return setCollapsedMobileNavbar(navbarState);
    };

    const renderGsuRouter = (router: IRoute[], isMobileNavbar: boolean) => {
        return router.map((route: IRoute, index: number) => (
            <CategoryMenuItem
                setIsCollapsedSidebar={setCollapsedMobileNavbar}
                isCollapsedSidebar={collapsedMobileNavbar}
                key={index + route.name}
                route={route}
                isMobileNavbar={isMobileNavbar}
            />
        ));
    };

    return (
        <div
            className={cn(getCollapsedStyleName("gsuNavMobileWrapper", "gsuNavMobileWrapperCollapsed"),
                {[styles.gsuNavMobileWrapperNotCollapsed]: !collapsedMobileNavbar})}
            onClick={() => clickMobileNavbar(!collapsedMobileNavbar)}
            role="button">
            <nav className={cn(styles.gsuNavMobile, {[styles.gsuNavMobileOpen]: !collapsedMobileNavbar})}
                 onClick={(e) => e.stopPropagation()} role="button">
                <div className={cn(styles.gsuNavMobileContent)}>
                    <ul className={styles.linkContainer}>{renderGsuRouter(router, true)}</ul>
                </div>
            </nav>
        </div>

    );
};

export default MobileNavBar;
