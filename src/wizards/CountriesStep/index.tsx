import {FC} from "react";
import {IWizardStep} from "../../types/globalTypes";
import GsuWizardGroupContainer from "../../components/GsuWizards/GsuWizardGroupContainer";
import GsuWizardSection from "../../components/GsuWizards/GsuWizardSection";
import GsuButtonSelect from "../../components/GsuButtonSelects/GsuButtonSelect";
import GsuButtonSingleSelect from "../../components/GsuButtonSelects/GsuButtonSingleSelect";
import {COUNTRIES} from "../../constants/countries";
import {CURRENCIES} from "../../constants/currencies";
import {storeDataToStorage} from "../../utils/localStorageUtils";
import GsuButtonMultiSelect from "../../components/GsuButtonSelects/GsuButtonMultiSelect";

const CountriesStep: FC<IWizardStep<any>> = ({componentState, change}) => {

    const {countries} = componentState
    const {currency} = componentState

    const setCountries = (countries: string[]) => {
        storeDataToStorage("TEST_COUNTRIES", countries)
        change({...componentState, countries: countries})
    }

    const setCurrency = (currency: string) => {
        storeDataToStorage("TEST_CURRENCY", currency)
        change({...componentState, currency: currency})
    }

    return <GsuWizardGroupContainer>
        <GsuWizardSection>
            <GsuButtonMultiSelect options={COUNTRIES} change={setCountries} values={countries}/>
        </GsuWizardSection>

        <GsuWizardSection>
            <GsuButtonSingleSelect options={CURRENCIES} change={setCurrency} value={currency}/>
        </GsuWizardSection>
    </GsuWizardGroupContainer>
}

export default CountriesStep;