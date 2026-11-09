import cn from "classnames/dedupe";

import styles from "./index.module.css";
import GsuButton from "../../GsuButton";
import GSUTooltip from "../../GsuTooltip";
import {FC} from "react";
import {GsuWizardFooterProps} from "../../../types/globalTypes";
import GsuTextButton from "../../GsuTextButton";

export const GsuWizardFooter: FC<GsuWizardFooterProps> = ({
                                                              componentState,
                                                              wizardState,
                                                              back,
                                                              backDisabled,
                                                              next,
                                                              nextDisabled,
                                                              nextDisabledTooltip,
                                                              isLastStep,
                                                              isFirstStep,
                                                              nextBtnLabel,
                                                              clean
                                                          }) => {
    const getNextBtnKey = () => {
        if (isFirstStep) {
            return 0;
        } else if (isLastStep) {
            return 2;
        }
        return 1;
    };


    return (
        <div className={cn(styles.footer, {[styles.footerContainerHidden]: wizardState._loader})}>
            <div className={cn(styles.footerContainer, {[styles.footerContainerNotFirst]: !isFirstStep})}>
                <div className={cn({[styles.btnNotFirstStepContainer]: !isFirstStep})}>
                    {isFirstStep ?
                        <GsuTextButton text="Сбросить" onClick={clean}/> :
                        <GsuButton
                            onClick={back}
                            btnClassName={styles.btnNotFirstStep}
                            text={"НАЗАД"}
                            style={"outline"}/>}
                </div>

                <GSUTooltip key={wizardState._idx}
                            text={nextDisabled && !wizardState._loader ? nextDisabledTooltip : ""}>
                    <div className={cn({[styles.btnNotFirstStepContainer]: !isFirstStep})}>
                        <GsuButton
                            style={isLastStep ? "secondary" : "primary"}
                            key={getNextBtnKey()}
                            onClick={next}
                            disabled={nextDisabled}
                            btnClassName={cn({[styles.btnNotFirstStep]: !isFirstStep})}
                            text={isLastStep ? "ЗАВЕРШИТЬ" : nextBtnLabel ? nextBtnLabel : "ДАЛЕЕ"}
                        />
                    </div>
                </GSUTooltip>
            </div>
        </div>
    );
};

export default GsuWizardFooter;
