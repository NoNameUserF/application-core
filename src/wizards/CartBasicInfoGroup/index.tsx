import styles from "./index.module.css"
import React, {FC, useEffect, useState} from "react";
import {IOptions, IWizardStep} from "../../types/globalTypes";
import {storeDataToStorage} from "../../utils/localStorageUtils";
import {COUNTRIES} from "../../constants/countries";
import {
    BudgetIcon, CalendarIcon, CURRENCIES, GsuButtonMultiSelect, GsuButtonSelect, GsuOptionsNumberInput,
    GsuPageDescription, GsuSelectCount,
    GsuSingleAutocomplete,
    GsuWizardGroupContainer,
    GsuWizardSection, GsuWizardSectionHeader, InfinityIcon, WishDietIcon, WishPeopleIcon,
    WorldIcon
} from "../../index";
import GsuWizardSelectCount from "../../components/GsuWizardSelectCount";
import GsuWizardSelectCountSection from "../../components/GsuWizards/GsuWizardSelectCountSection";

export const wishes: any = {
    diets: {
        name: "Придерживаетесь ли вы какой-либо диеты",
        values: {
            NO: { label: "Без диет", Icon: InfinityIcon },
            VEGETARIAN: { label: "Вегетарианская", Icon: WorldIcon },
            VEGAN: { label: "Веганская", Icon: WorldIcon },
            GLUTEN_FREE: { label: "Безглютеновая", Icon: WorldIcon },
            KETO: { label: "Кето", Icon: WorldIcon },
            PALEO: { label: "Палео", Icon: WorldIcon },
            DAIRY_FREE: { label: "Безмолочная", Icon: WorldIcon },
            NUT_FREE: { label: "Без орехов", Icon: WorldIcon },
            SOY_FREE: { label: "Без сои", Icon: WorldIcon },
            LOW_CARB: { label: "Низкоуглеводная", Icon: WorldIcon },
            LOW_CALORIE: { label: "Низкокалорийная", Icon: WorldIcon },
            HALAL: { label: "Халяль", Icon: WorldIcon },
            KOSHER: { label: "Кошерная", Icon: WorldIcon },
            LOW_SALT: { label: "Низкосолевая", Icon: WorldIcon },
        },
    },
};


export const CART_ADDITIONAL:IOptions = {
    alcohol: {label: "Алкоголь", Icon: WorldIcon},
    sweets: {label: "Сладости", Icon: WorldIcon},
    water: {label: "Вода", Icon: WorldIcon},
}

export const CART_ADDITIONAL_NO_ADULTS:IOptions = {
    sweets: {label: "Сладости", Icon: WorldIcon},
    water: {label: "Вода", Icon: WorldIcon},
}

export interface CartBasicInfoGroupState {
    country: string | null;
    budget: number;
    daysCount: number;
    currency: string;
    adults: number;
    children: number;
    diets: string[];
    additional: string[];
}

export const CartBasicInfoGroup: FC<IWizardStep<CartBasicInfoGroupState>> = ({componentState, change}) => {
    const {country} = componentState
    const {budget} = componentState
    const {daysCount} = componentState
    const {currency} = componentState
    const {adults} = componentState
    const {children} = componentState
    const {diets} = componentState
    const {additional} = componentState

    const [errorBudget, setErrorBudget] = useState("")
    const [errorDays, setErrorDays] = useState("")

    useEffect(() => {
        checkBudget()
        checkErrorDays()
    }, [componentState])

    const checkErrorDays = () => {
        let errorDays = ""
        if (daysCount < 1) {
            errorDays = "Количество дней должно быть больше 0"
        } else if (daysCount > 30) {
            errorDays = "Количество дней должно быть не больше 30"
        }
        setErrorDays(errorDays)
    }

    const checkBudget = () => {
        let errorBudget = ""
        const coef = CURRENCIES[componentState.currency]?.coef || 1;

        if (budget / coef < 10) {
            errorBudget = "Слишком маленький бюджет"
        } else if (budget / coef > 10000) {
            errorBudget = "Слишком большой бюджет"
        }
        setErrorBudget(errorBudget)
    }

    const setCurrency = (currency: string) => {
        storeDataToStorage("cartCurrency", currency)
        change({...componentState, currency: currency})
    }

    const setCountry = (country: string) => {
        const currency = COUNTRIES[country].currency;

        if (currency) {
            storeDataToStorage("cartCurrency", currency)
            storeDataToStorage("cartCountry", country)
            change({...componentState, country: country, currency: currency})
        } else {
            storeDataToStorage("cartCountry", country)
            change({...componentState, country: country})
        }
    }

    const setBudget = (budget: number) => {
        storeDataToStorage("cartBudget", budget)
        change({...componentState, budget: budget})
    }

    const setDaysCount = (daysCount: number) => {
        storeDataToStorage("cartDaysCount", daysCount)
        change({...componentState, daysCount: daysCount})
    }

    const setAdults = (adults: number) => {
        storeDataToStorage("cartAdults", adults);
        change({...componentState, adults: adults})
    }

    const setChildren = (children: number) => {
        storeDataToStorage("cartChildren", children);
        change({...componentState, children: children})
    }

    const changeDiets = (updatedDiets: string[]) => {
        storeDataToStorage("diets", updatedDiets)
        change({...componentState, diets: updatedDiets})
    }

    const setAdditional = (additional: string[]) => {
        storeDataToStorage("cartAdditional", additional)
        change({...componentState, additional: additional})
    }


    return (<>
            <GsuWizardGroupContainer>
                <GsuPageDescription title={'Ваши предпочтения'}
                                    description={'Пройдите небольшой опрос для того, чтобы мы смогли предложить продукты, которые соответствуют вашим пожеланиям и предпочтениям.'}
                />

                <GsuWizardSection
                    descriptionText={"Страна проживания"}
                    Icon={WorldIcon}
                    helperText={
                        "Страна проживания используется исключительно для целей определения цен на продукты и валюты в указанной стране."
                    }
                >
                    <GsuSingleAutocomplete
                        value={country}
                        listName={"Список стран"}
                        placeholder={"Страна"}
                        onOptionSelect={setCountry}
                        options={COUNTRIES}
                    />
                </GsuWizardSection>
                <div style={{height: 300}}/>
                <GsuWizardSection descriptionText={"Бюджет"} Icon={BudgetIcon}>
                    <GsuOptionsNumberInput
                        value={budget}
                        error={errorBudget}
                        onChangeValue={setBudget}
                        options={CURRENCIES}
                        onChangeOption={setCurrency}
                        optionValue={currency}
                    />
                </GsuWizardSection>

                <GsuWizardSection descriptionText={"Количество дней и человек"}>
                    <GsuWizardSelectCountSection>
                        <GsuWizardSelectCount Icon={CalendarIcon} change={setDaysCount} descriptionText={"Дни"} value={daysCount} maxCount={30}/>
                        <GsuWizardSelectCount Icon={WishPeopleIcon} change={setAdults} descriptionText={"Взрослые"} value={adults}/>
                        <GsuWizardSelectCount Icon={WishPeopleIcon} change={setChildren} descriptionText={"Дети"} value={children}/>
                    </GsuWizardSelectCountSection>
                </GsuWizardSection>
                <GsuWizardSection Icon={WishDietIcon} descriptionText={"Диета"}>
                    <GsuButtonSelect
                        values={diets}
                        options={wishes.diets.values}
                        change={changeDiets}
                        checkDefaultIfAllSelected={false}
                    />
                </GsuWizardSection>
                <GsuWizardSection descriptionText={"Дополнительные покупки"}>
                    {adults > 0 ?
                        <GsuButtonMultiSelect options={CART_ADDITIONAL} change={setAdditional} values={additional}/> :
                        <GsuButtonMultiSelect options={CART_ADDITIONAL_NO_ADULTS} change={setAdditional}
                                              values={additional}/>
                    }
                </GsuWizardSection>
            </GsuWizardGroupContainer>

        </>
    )
}

export default CartBasicInfoGroup
