import {IWorkflowStep} from "../../types/globalTypes";
import FinishStep from "../../wizards/FinishStep";
import {getDataFromStorage} from "../../utils/localStorageUtils";
import CountriesStep from "../../wizards/CountriesStep";

const COUNTRIES_STEP: IWorkflowStep<any> = {
    uid: "COUNTRIES",
    name: "Страны",
    initState: () => {
        return {
            countries: getDataFromStorage("TEST_COUNTRIES") || ["AUSTRALIA"],
            currency: getDataFromStorage("TEST_CURRENCY") || "AUD",
        }
    },
    cleanState: () => {
        return {countries: ["AUSTRALIA"], currency: "AUD"}
    },
    storageDependencies: ["TEST_COUNTRIES", "TEST_CURRENCY"],
    component: (previousComponentState, componentState, wizardState) => {
        return CountriesStep;
    },

    callback: (componentState, wizardState, fetchResponse) => {
        return {flow: componentState.flow};
    }
}

const FINISH_STEP: IWorkflowStep<any> = {
    uid: "FINISH_STEP",
    name: "ФИНИШ",
    initState: () => {
        return {flow: null}
    },
    component: (previousComponentState, componentState, wizardState) => {
        return FinishStep;
    },
}


const workflow = [COUNTRIES_STEP, FINISH_STEP];

export default workflow;