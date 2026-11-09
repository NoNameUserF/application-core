import {FC, useState} from "react";
import cn from "classnames/dedupe";
import {Link} from "react-router-dom";
import GsuStaticTooltip from "../GsuStaticTooltip";

import styles from "./index.module.css";
import {
    BurgerNavbarIcon,
    ChatIcon, CloseIcon, CloseIconSmall,
    DonationIcon,
    InformationIcon,
    LanguageIcon, MainLogo,
    MoreOptionsIcon,
    SearchIcon, SearchInputDropDownIcon,
} from "../../assets/Icons";


interface HeaderProps {
    openModalWithContent: (contentType: string, buttonId: string | null) => void;
    activeButton: string | null
    logoSrc: string,
    logoSrcMobile: string,
    logoMain: string,
    mobileNavbarClick: () => void
    collapsedMobileNavbar: boolean
}

export const Header: FC<HeaderProps> = ({
                                            openModalWithContent,
                                            activeButton,
                                            logoSrc,
                                            logoSrcMobile,
                                            mobileNavbarClick,
                                            collapsedMobileNavbar,
                                            logoMain
                                        }) => {
    const [language] = useState("Рус");
    const [openMenu, setOpenMenu] = useState(false);

    const closeHeader = () => {
        setOpenMenu(false);
    };
    const renderMenuInfoBlock = () => {
        return (
            <div className={cn(styles.gsuMenuInfoBlock)}>
                <button onClick={() => openModalWithContent("about", null)}
                        className={cn(styles.gsuMenuInfoBlockElement)}>
                    <div className={styles.iconBlock}>
                        <InformationIcon/>
                    </div>
                    <p className={cn(styles.gsuMenuInfoBlockElementTitle)}>О проекте</p>
                </button>
                <button className={cn(styles.gsuMenuInfoBlockElement)}
                        onClick={() => openModalWithContent("feedback", null)}>
                    <div className={styles.iconBlock}>
                        <ChatIcon/>
                    </div>
                    <p className={cn(styles.gsuMenuInfoBlockElementTitle)}>Обратная связь</p>
                </button>
                <button className={cn(styles.gsuMenuInfoBlockElement)}
                        onClick={() => openModalWithContent("support", null)}>
                    <div className={styles.iconBlock}>
                        <DonationIcon/>
                    </div>
                    <p className={cn(styles.gsuMenuInfoBlockElementTitle)}>Поддержать проект</p>
                </button>
            </div>
        );
    };

    const renderMenuWindow = () => {
        return (
            <div className={cn(styles.gsuMenu, {[styles.gsuMenuOpen]: openMenu})} onClick={closeHeader} role="button">
                <div className={cn(styles.gsuMenuWrap)} onClick={(e) => e.stopPropagation()} role="button">
                    <div className={cn(styles.gsuMenuContainer)}>
                        <div>
                            <div className={cn(styles.gsuMenuHeader)}>
                                <button onClick={() => setOpenMenu(false)} className={cn(styles.gsuMenuClose)}>
                                    <CloseIcon/>
                                </button>
                                <div className={cn(styles.gsuMenuLogo)}>
                                    <img src={logoSrcMobile} alt="logo"/>
                                </div>
                            </div>
                            <div className={styles.separator}/>
                            {renderMenuInfoBlock()}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <header className={cn(styles.gsuHeader)}>
            <div className={cn(styles.gsuHeaderContainer)}>
                <button onClick={() => setOpenMenu(true)} className={cn(styles.gsuHeaderContainerBurger)}>
                    <MoreOptionsIcon/>
                </button>
                <div className={cn(styles.gsuHeaderContainerLogoBlock)}>
                    <div className={styles.MainLogo}>
                        <Link to={"https://alivio.ai"} target={"_blank"}>
                            {logoMain ? <img src={logoMain} alt="mainLogo"/> : <MainLogo/>}
                        </Link>
                    </div>
                    <div className={cn(styles.gsuOptionsBlockLine)}/>
                    <Link to={"/"}>
                        <img src={logoSrc} alt="logoCooking" className={cn(styles.gsuLogo)}/>
                        <img src={logoSrcMobile} alt="logo" className={cn(styles.gsuLogoMobile)}/>
                    </Link>
                    <div className={cn(styles.gsuSearch)}>
                        <input className={cn(styles.gsuSearchInput)} placeholder="Поиск"/>
                        {/*<img src={searchIcon} alt="search" className={cn(styles.gsuSearchIcon)} />*/}
                        <SearchIcon/>
                    </div>
                </div>
                <button className={cn(styles.gsuHeaderMobileNavbarBurger)} onClick={() => mobileNavbarClick()}>
                    {collapsedMobileNavbar ? <BurgerNavbarIcon/> : <CloseIconSmall/>}
                </button>
            </div>
            <div className={cn(styles.gsuOptionsBlock)}>
                <div className={cn(styles.gsuLanguageBlock)}>
                    <LanguageIcon/>
                    <h6 className={cn(styles.gsuLanguageBlockName)}>{language}</h6>
                    <SearchInputDropDownIcon/>
                </div>
                <div className={cn(styles.gsuOptionsBlockLine)}/>
                <div className={cn(styles.gsuInfoBlock)}>
                    <GsuStaticTooltip text={"О нас"} position={"left"}>
                        <button
                            onClick={() => openModalWithContent("about", "aboutButton")}
                            className={cn(styles.gsuInfoBlockElement, {[styles.active]: activeButton === "aboutButton"})}>
                            <InformationIcon/>
                        </button>
                    </GsuStaticTooltip>
                    <GsuStaticTooltip text={"Обратная связь"} position={"bot-center"}>
                        <button
                            onClick={() => openModalWithContent("feedback", "feedbackButton")}
                            className={cn(styles.gsuInfoBlockElement, {[styles.active]: activeButton === "feedbackButton"})}>
                            <ChatIcon/>
                        </button>
                    </GsuStaticTooltip>
                    <GsuStaticTooltip text={"Поддержать проект"} position={"bot-right"}>
                        <button
                            onClick={() => openModalWithContent("support", "supportButton")}
                            className={cn(styles.gsuInfoBlockElement, {[styles.active]: activeButton === "supportButton"})}>
                            <DonationIcon/>
                        </button>
                    </GsuStaticTooltip>
                </div>
            </div>
            {renderMenuWindow()}
        </header>
    );
};

export default Header;