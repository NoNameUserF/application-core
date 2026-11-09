import {FC} from "react";
import {IWizardStep} from "../../types/globalTypes";

const FinishStep: FC<IWizardStep<any>> = ({componentState}) => {
    return <div>{JSON.stringify(componentState.flow)}</div>
}

export default FinishStep;