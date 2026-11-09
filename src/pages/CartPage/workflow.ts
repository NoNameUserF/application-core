import {IWorkflowStep} from "../../types/globalTypes";
import {CartBasicInfoGroup, CartBasicInfoGroupState} from "../../wizards/CartBasicInfoGroup";
import {getDataFromStorage} from "../../utils/localStorageUtils";
import {fetchPost} from "../../api/api";
import {CURRENCIES} from "../../constants/currencies";

const CART_BASIC_INFO_GROUP: IWorkflowStep<CartBasicInfoGroupState> = {
    uid: "CARTBASICINFOGROUP",
    name: "БАЗОВАЯ ИНФОРМАЦИЯ",
    initState: () => {
        return {
            country: getDataFromStorage("cartCountry") || null,
            budget: getDataFromStorage("cartBudget") || 100,
            currency: getDataFromStorage("cartCurrency") || "USD",
            daysCount: getDataFromStorage("cartDaysCount") || 7,
            adults: getDataFromStorage("cartAdults") || 1,
            children: getDataFromStorage("cartChildren") || 0,
            diets: getDataFromStorage("diets") || ["NO"],
            additional: getDataFromStorage("cartAdditional") || [],
        }
    },
    cleanState : () => {
        return {
            country: null,
            budget: 100,
            currency: "USD",
            daysCount:  7,
            adults: 1,
            children: 0,
            diets: ["NO"],
            additional: [],
        }
    },
    storageDependencies: [
        "cartCountry",
        "cartBudget",
        "cartCurrency",
        "cartDaysCount",
        "cartAdults",
        "cartChildren",
        "diets",
        "cartAdditional"
    ],
    nextBtnLabel: "СГЕНЕРИРОВАТЬ",
    component: (previousComponentState: unknown, componentState, wizardState) => {
        return CartBasicInfoGroup
    },

    isNextDisabled: (componentState, wizardState) => {
        const coef = CURRENCIES[componentState.currency]?.coef || 1;

        return (
            !componentState.country ||
            componentState.budget / coef < 10 ||
            componentState.budget / coef > 10000 ||
            componentState.daysCount < 1 ||
            componentState.daysCount > 30 ||
            componentState.adults <= 0 && componentState.children <= 0
        )
    },

    nextDisabledTooltip: (componentState, wizardState) => {
        const coef = CURRENCIES[componentState.currency]?.coef || 1;

        if (!componentState.country) {
            return "Выберите страну"
        } else if (componentState.budget / coef < 10) {
            return "Слишком маленький бюджет"
        } else if (componentState.budget / coef > 10000) {
            return "Слишком большой бюджет"
        } else if (componentState.daysCount < 1) {
            return "Количество дней должно быть больше 0"
        } else if (componentState.daysCount > 30) {
            return "Количество дней должно быть не больше 30"
        } else if (componentState.adults <= 0 && componentState.children <= 0) {
            return "Должен быть хотя бы 1 человек"
        }
        return "";
    },
}

const workflow = [
    CART_BASIC_INFO_GROUP,
]

export type CartWizardPageState = CartBasicInfoGroupState



export default workflow
