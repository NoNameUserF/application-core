import {FC, ReactNode, useState} from "react";
import cn from "classnames/dedupe";

import {BrowserRouter} from "react-router-dom";

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Widget from "../components/Widget";
import ModalBox from "../components/ModalBox";
import ErrorBoundary from "../components/ErrorBoundary";
import GsuFeedbackModal from "../components/GsuModals/GsuFeedbackModal";

import styles from "./app.module.css";
import {IRoute} from "../types/globalTypes";

interface GSUAppProps {
    router: IRoute[];
    appName: string;
    aboutModal?: FC;
    donateModal?: FC;
    logoSrc: string;
    logoSrcMobile: string;
    img404src: string;
    img500src: string;
    feedbackImg: string;
    mainLogo: string;
}

const GSUApp: FC<GSUAppProps> = ({
                                     router,
                                     appName,
                                     aboutModal,
                                     donateModal,
                                     logoSrc,
                                     logoSrcMobile,
                                     img404src,
                                     img500src,
                                     feedbackImg,
                                     mainLogo
                                 }) => {
    const GsuRouter = router ?? false;

    const Div:FC = () => <div>{}</div>

    const [modalContent, setModalContent] = useState<ReactNode>();
    const [open, setOpen] = useState(false);
    const [collapsedMobileNavbar, setCollapsedMobileNavbar] = useState(true);
    const [activeButton, setActiveButton] = useState<string | null>(null);

    const CustomAboutModal = aboutModal ?? Div;
    const CustomDonateModal = donateModal ?? Div;

    const mobileNavbarClick = () => {
        setCollapsedMobileNavbar((prevState) => !prevState);
    };

    const closeModal = () => {
        setOpen(false);
        setActiveButton(null);
    };

    const chooseModalContent = (contentType: string) => {
        switch (contentType) {
            case "about":
                setModalContent(<CustomAboutModal/>);
                return;
            case "feedback":
                setModalContent(<GsuFeedbackModal feedbackImg={feedbackImg} appName={appName}/>);
                return;
            case "support":
                setModalContent(<CustomDonateModal/>);
                return;
            default: {
                setModalContent(<CustomAboutModal/>);
            }
        }
    };

    const openModalWithContent = (contentType: string, buttonId: string | null) => {
        setOpen(true);
        chooseModalContent(contentType);
        setActiveButton(buttonId);
    };

    return (
        <BrowserRouter>
            <ErrorBoundary img500src={img500src}>
                <Header
                    logoMain={mainLogo}
                    collapsedMobileNavbar={collapsedMobileNavbar}
                    mobileNavbarClick={mobileNavbarClick}
                    openModalWithContent={openModalWithContent}
                    activeButton={activeButton}
                    logoSrc={logoSrc}
                    logoSrcMobile={logoSrcMobile}></Header>
                <div className={cn(styles.gsuApp)}>
                    <ModalBox open={open} setOpen={closeModal}>
                        {modalContent}
                    </ModalBox>
                    <NavBar
                        appName={appName}
                        router={router}
                        collapsedMobileNavbar={collapsedMobileNavbar}
                        setCollapsedMobileNavbar={setCollapsedMobileNavbar}></NavBar>
                    <Widget router={GsuRouter} img404src={img404src}></Widget>
                </div>
            </ErrorBoundary>
        </BrowserRouter>
    );
};


export default GSUApp;
