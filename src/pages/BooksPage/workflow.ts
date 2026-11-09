import {IWorkflowStep} from "../../types/globalTypes";
import FinishStep from "../../wizards/FinishStep";

const BOOKS_FLOW: IWorkflowStep<any> = {
    uid: "BOOKS_SCENARIO",
    name: "ЧТО ПОСМОТРЕТЬ",
    initState: () => {
        return {flow: null}
    },
    cleanState: () => {
        return {flow: null}
    },
    storageDependencies: [],
    component: (previousComponentState, componentState, wizardState) => {
        return "/xml/book.xml";
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


const workflow = [BOOKS_FLOW, FINISH_STEP];

export default workflow;