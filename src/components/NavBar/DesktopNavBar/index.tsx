import {FC, useState} from "react";

import cn from "classnames/dedupe";

import {CategoryMenuItem} from "../../CategoryMenuItem";

import styles from "./index.module.css";
import {SideBarIcon} from "../../../assets/Navbar/SideBarIcon";
import {getLocalStorageNavbarStateValue, setLocalStorageNavbarStataValue} from "./utils";
import {CollapsedSurveyWindow, PersonalRecipes, SideBarArrow} from "../../../assets/Icons";
import {IRoute} from "../../../types/globalTypes";

interface DesktopNavBarProps {
    router: IRoute[];
    appName: string;
}

export const DesktopNavBar: FC<DesktopNavBarProps> = ({router, appName}) => {
    const [isCollapsedSidebar, setIsCollapsedSidebar] = useState<boolean>(
        getLocalStorageNavbarStateValue(appName) ? getLocalStorageNavbarStateValue(appName) === "close" : true,
    );
    const [hoverIcon , setHoverIcon] = useState<boolean>(false)

    const getCollapsedStyleName = (firstStyleName: string, secondStyleName: string) => {
        return cn(styles[`${firstStyleName}`], {[styles[`${secondStyleName}`]]: isCollapsedSidebar});
    };

    const toggleSidebar = () => {
        setLocalStorageNavbarStataValue(appName, isCollapsedSidebar ? "open" : "close");
        setIsCollapsedSidebar(!isCollapsedSidebar);
    };

    const renderGsuRouter = (router: IRoute[], isMobileNavbar: boolean) => {
        return router.map((route: IRoute, index: number) => (
                <CategoryMenuItem
                    setIsCollapsedSidebar={setIsCollapsedSidebar}
                    isCollapsedSidebar={isCollapsedSidebar}
                    key={index + route.name}
                    route={route}
                    isMobileNavbar={isMobileNavbar}
                />
            ));
    };

    return (
        <nav className={getCollapsedStyleName("gsuNavDesktop", "gsuNavDesktopCollapsed")}>
            <button
                onMouseMove={() => setHoverIcon(true)}
                onMouseLeave={() => setHoverIcon(false)}
                type="button"
                className={getCollapsedStyleName("gsuSideNav__collapseAction", "gsuSideNav__collapseAction_left")}
                onClick={toggleSidebar}>
                <SideBarIcon hover={hoverIcon}/>
            </button>
            <div className={cn(styles.categoriesWrap)}>{renderGsuRouter(router, false)}</div>
            <div className={getCollapsedStyleName("quizPromo", "quizPromoCollapsed")}>
                {!isCollapsedSidebar && (
                    <PersonalRecipes/>
                )}
                {!isCollapsedSidebar && (
                    <h5 className={cn(styles.quizPromo__title)}>Хотите получать персонализированные рецепты?</h5>
                )}
                <button
                    className={getCollapsedStyleName("quizPromo__actionElement", "quizPromo__actionElement_collapsed")}
                    type="button">
                    {isCollapsedSidebar ? (
                        <CollapsedSurveyWindow/>
                    ) : (
                        <>Пройдите опрос</>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default DesktopNavBar;
