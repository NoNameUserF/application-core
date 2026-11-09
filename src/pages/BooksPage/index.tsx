import { useEffect } from "react";
// import ReactGA from "react-ga4";
import styles from "../../root/app.module.css";
import workflow from "./workflow";
import {IWizardState} from "../../types/globalTypes";
import GsuWizard from "../../components/GsuWizards/GsuWizard";
import GsuSpinner from "../../components/GsuSpinner";
import GsuStepper from "../../components/GsuStepper";
import GsuWizardFooter from "../../components/GsuWizards/GsuWizardFooter";

const BooksPage = () => {

    useEffect(() => {
        // ReactGA.send({hitType: 'pageview', page: location.pathname});
    }, []);

    const ErrorModal = (componentState: any, wizardState: IWizardState, error: any) => {
        return () => <div>ERROR</div>;
    };

    const FinishModal = (componentState: any, wizardState: IWizardState) => {
        return () => <div/>;
    };

    const wizardContainerStyle = (componentState: any, wizardState: IWizardState) => {
        return {};
    };

    const wizardWindowStyle = (componentState: any, wizardState: IWizardState) => {
        return {};
    };

    const wizardContentStyle = (componentState: any, wizardState: IWizardState) => {
        return wizardState._loader ? {paddingTop: "0"} : {};
    };

    return (
        <div className={styles.wizardPageContainer}>
            <GsuWizard
                workflow={workflow}
                id={"Place"}
                Loader={GsuSpinner}
                Footer={GsuWizardFooter}
                ErrorModal={ErrorModal}
                FinishModal={FinishModal}
                styles={{
                    container: wizardContainerStyle,
                    window: wizardWindowStyle,
                    content: wizardContentStyle,
                }}
                classes={{
                    container: styles.wizardContainer,
                    window: styles.wizardWindow,
                    content: styles.wizardContent,
                }}
            />
        </div>
    )
}

export default BooksPage;