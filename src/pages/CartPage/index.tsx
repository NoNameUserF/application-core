import React, { FC, useEffect } from "react";
import workflow, {CartWizardPageState} from "./workflow";
import httpResponseCodeList from "../../helpers/httpResponseCodeList";
import {isGsuServerError} from "../../helpers/isGsuServerError";
import {GsuError, IErrorModal, IWizardState} from "../../types/globalTypes";
import GsuDefaultErrorModal from "../../components/GsuModals/GsuDefaultErrorModal";
import GsuWizard from "../../components/GsuWizards/GsuWizard";
import {GsuSpinner, GsuWizardFooter} from "../../index";
import styles from "./index.module.css";


const header = "Хороших покупок!";
const msg =
	"Если вам понравилась наша корзина, вы можете поддержать наш проект пожертвованием или поделиться своим отзывом, чтобы помочь нам стать еще лучше.";
const btnText = "Назад к корзине";

const CartPage: FC = () => {
	useEffect(() => {
		// ReactGA.send({ hitType: "pageview", page: location.pathname });
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
				id={"Cart"}
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
	);
};

export default CartPage;
