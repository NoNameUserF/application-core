import {CSSProperties, FC, useEffect, useRef, useState} from "react";
import {scrollWidgetToTop} from "../../../utils/widgetUtils";
import {
    IErrorModal,
    IFinishModal, GsuSpinnerProps,
    GsuWizardFooterProps,
    IWorkflowStep, IWizardState, GsuError, IWizardStep, GsuWizardFlowHandles,
} from "../../../types/globalTypes";
import BooksFlow from "../GsuWizardFlow";
import {removeDataFromStorage} from "../../../utils/localStorageUtils";

interface GsuWizardProps<T = any> {
    workflow: IWorkflowStep<T>[];
    id: string;
    Loader: FC<GsuSpinnerProps>;
    Footer: FC<GsuWizardFooterProps>;
    ErrorModal: (componentState: T, wizardState: IWizardState, _error: GsuError) => FC<IErrorModal<T>>;
    FinishModal: (componentState: T, wizardState: IWizardState) => FC<IFinishModal<T>>;
    callbackPage?: () => void;
    callbackLoader?: () => void;
    styles?: {
        container?: (componentState: T, wizardState: IWizardState) => CSSProperties;
        window?: (componentState: T, wizardState: IWizardState) => CSSProperties;
        content?: (componentState: T, wizardState: IWizardState) => CSSProperties;
    };
    classes?: { container?: string; window?: string; content?: string };
}

const GsuWizard: FC<GsuWizardProps> = ({
                                           workflow,
                                           id,
                                           Loader,
                                           Footer,
                                           ErrorModal,
                                           FinishModal,
                                           callbackPage,
                                           callbackLoader,
                                           styles,
                                           classes,
                                       }) => {

    const flowRef = useRef<GsuWizardFlowHandles>(null);

    const [wizardState, setWizardState] = useState<IWizardState>(
        workflow.reduce<IWizardState>(
            (acc, item: IWorkflowStep<unknown>) => {
                if (item && item.initState) {
                    acc[item.uid] = item.initState();
                }
                return acc;
            },
            {
                _idx: 0,
                _flowQuesIdx: 0,
                _flowFinished: false,
                _id: id,
                _loader: false,
                _finishModal: false,
                _warningModal: false,
                _errorModal: false,
                _error: "",
            },
        ),
    );

    useEffect(() => {
        callbackPage && callbackPage();

        scrollWidgetToTop();
    }, [wizardState._idx]);

    useEffect(() => {
        callbackLoader && callbackLoader();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wizardState._loader]);

    const steps = workflow.map((flow) => flow.name);

    const {_idx} = wizardState;
    const currentWorkflow = workflow[_idx];
    const {uid} = workflow[_idx];
    const componentState = wizardState[uid];

    const previousWorkflow = _idx > 0 ? workflow[_idx - 1] : null;
    const previousComponentState =
        _idx > 0 && previousWorkflow ? wizardState[previousWorkflow.uid] : null;

    const nextWorkflow = _idx < workflow.length - 1 ? workflow[_idx + 1] : null;
    // const nextComponentState = _idx < workflow.length - 1 ? wizardState[nextWorkflow.uid] : null;

    const isLoader = () => {
        return wizardState._loader;
    };

    const setLoader = (value: boolean) => {
        setWizardState({
            ...wizardState,
            _loader: value,
        })
    }

    const isError = () => {
        return wizardState._errorModal;
    };

    const isFlow = (component: FC<IWizardStep<unknown>> | string) => {
        return typeof component === "string";
    }

    const isWarning = () => {
        if (!currentWorkflow.warningModal || !currentWorkflow.showWarning) {
            return false;
        }
        return (
            currentWorkflow.warningModal(componentState, wizardState) &&
            currentWorkflow.showWarning(componentState, wizardState)
        );
    };

    const isNextDisabled = () => {
        if (isLoader()) {
            return true;
        }
        if (!currentWorkflow.isNextDisabled) {
            return false;
        }
        return currentWorkflow.isNextDisabled(componentState, wizardState);
    };

    const isBackDisabled = () => {
        if (_idx === 0 || isLoader()) {
            return true;
        }
        if (!currentWorkflow.isBackDisabled) {
            return false;
        }
        return currentWorkflow.isBackDisabled(componentState, wizardState);
    };

    const setOpenFinishModal = (value: boolean) => {
        setWizardState({
            ...wizardState,
            _finishModal: value,
        });
    };

    const setOpenWarningModal = (value: boolean) => {
        setWizardState({
            ...wizardState,
            _warningModal: value,
        });
    };
    const setOpenErrorModal = (value: boolean) => {
        setWizardState({
            ...wizardState,
            _errorModal: value,
        });
    };

    const reset = () => {
        setWizardState(
            workflow.reduce<IWizardState>(
                (acc, item: IWorkflowStep<unknown>) => {
                    if (item && item.initState) {
                        acc[item.uid] = item.initState();
                    }
                    return acc;
                },
                {
                    _idx: 0,
                    _flowQuesIdx: 0,
                    _flowFinished: false,
                    _id: id,
                    _loader: false,
                    _finishModal: false,
                    _warningModal: false,
                    _errorModal: false,
                    _error: "",
                },
            ),
        );
    };

    const clean = () => {
        currentWorkflow.storageDependencies?.forEach(dependency => {
            removeDataFromStorage(dependency);
        })

        setWizardState({
            ...wizardState,
            ...{[uid]: currentWorkflow.cleanState ? currentWorkflow.cleanState() : currentWorkflow.initState()},
        })

        scrollWidgetToTop();
    }

    const abort = (error: GsuError) => {
        setWizardState({
            ...wizardState,
            _loader: false,
            _errorModal: true,
            _error: error,
        });
    };

    const refresh = () => {
        if (currentWorkflow.refresh) {
            setWizardState({...wizardState, _loader: true, _warningModal: false});
            currentWorkflow.refresh(previousComponentState, componentState, wizardState)
                .then((response) => {
                    setWizardState({
                        ...wizardState,
                        ...{
                            [uid]: previousWorkflow?.callback?.(
                                componentState,
                                wizardState,
                                response,
                            ),
                        },
                        _loader: false,
                    });
                })
                .catch((error) => {
                    abort(error);
                });
        }
    };

    const nextClick = (isFlow: boolean) => {
        if (isFlow && !wizardState._flowFinished) {
            const flowReturn = flowRef.current?.next();
            const flowFinished = flowReturn ? flowReturn.finished : false;
            const flowState = flowReturn && flowFinished ? flowReturn.flow : null;
            setWizardState({
                    ...wizardState,
                    _flowQuesIdx: wizardState._flowQuesIdx + 1,
                    _flowFinished: flowFinished,
                    ...{[uid]: {flow: flowState}}
                }
            )
        } else {
            next(false);
        }
    };

    const next = (force = false) => {
        if (isWarning() && !force) {
            setOpenWarningModal(true);
            return;
        }

        if (currentWorkflow.fetch) {
            setWizardState({...wizardState, _loader: true, _warningModal: false});
            currentWorkflow.fetch(componentState, wizardState)
                .then((response) => {
                    if (nextWorkflow) {
                        setWizardState({
                            ...wizardState,
                            ...{
                                [nextWorkflow.uid]: currentWorkflow.callback?.(
                                    componentState,
                                    wizardState,
                                    response,
                                ),
                            },
                            _idx: _idx + 1,
                            _loader: false,
                            _warningModal: false,
                        });
                    } else {
                        abort("No back workflow");
                    }
                })
                .catch((error) => {
                    abort(error);
                });

            return;
        }

        if (currentWorkflow.callback) {
            if (nextWorkflow) {
                setWizardState({
                    ...wizardState,
                    ...{
                        [nextWorkflow.uid]: currentWorkflow.callback(
                            componentState,
                            wizardState,
                            null,
                        ),
                    },
                    _idx: _idx + 1,
                    _warningModal: false,
                });
            } else {
                abort("No back workflow");
            }
            return;
        }

        setWizardState({...wizardState, _idx: _idx + 1, _warningModal: false});
    };

    const back = (isFlow: boolean) => {
        if (isFlow) {
            flowRef.current?.back();
            setWizardState({...wizardState, _flowFinished: false, _flowQuesIdx: wizardState._flowQuesIdx - 1});
        } else {
            if (currentWorkflow.clearable) {
                setWizardState({
                    ...wizardState,
                    ...{[uid]: currentWorkflow.initState()},
                    _idx: _idx - 1,
                    _flowFinished: false,
                    _flowQuesIdx: 0,
                });

                return;
            }

            setWizardState({...wizardState, _idx: _idx - 1, _flowQuesIdx: 0, _flowFinished: false});
        }
    };

    const change = (childData: unknown) => {
        setWizardState({...wizardState, ...{[uid]: childData}});
    };

    const finish = () => {
        setOpenFinishModal(true);
    };

    const isLastStep = () => {
        return _idx === workflow.length - 1;
    };

    const isFirstStep = (isFlow: boolean) => {
        if (isFlow) {
            return _idx === 0 && wizardState._flowQuesIdx === 0;
        } else {
            return _idx === 0;
        }
    };

    const innerTasks = () => {
        if (!currentWorkflow.innerTasks) {
            return {};
        }

        const tasks: Record<string, (props?: unknown) => void> = {};
        Object.entries(currentWorkflow.innerTasks(componentState, wizardState, abort)).forEach(([key, task]) => {
            tasks[key] = (props: unknown) => {
                setWizardState({...wizardState, _loader: true});
                task
                    .fetch(componentState, wizardState, props)
                    .then((response: unknown) => {
                        setWizardState({
                            ...wizardState,
                            ...{[uid]: task.callback(componentState, wizardState, response, props)},
                            _loader: false,
                        });
                    })
                    .catch((error) => {
                        abort(error);
                    });
            };
        });

        return tasks;
    };

    const nextDisabledTooltip = () => {
        if (!currentWorkflow.nextDisabledTooltip) {
            return;
        }
        return currentWorkflow.nextDisabledTooltip(componentState, wizardState);
    };


    const CurrentComponent = currentWorkflow.component(previousComponentState, componentState, wizardState);

    const FinishMdl = isLastStep() ? FinishModal(componentState, wizardState) : null;
    const ErrorMdl = isError() ? ErrorModal(componentState, wizardState, wizardState._error) : null;
    const WarningMdl = isWarning() && currentWorkflow && currentWorkflow.warningModal
        ? currentWorkflow.warningModal(componentState, wizardState) : null;

    const wzdContainerStyle = !!styles && !!styles.container ? styles.container(componentState, wizardState) : undefined;
    const wzdWindowStyle = !!styles && !!styles.window ? styles.window(componentState, wizardState) : undefined;
    const wzdContentStyle = !!styles && !!styles.content ? styles.content(componentState, wizardState) : undefined;

    const wzdContainerClass = classes ? classes.container : undefined;
    const wzdWindowClass = classes ? classes.window : undefined;
    const wzdContentClass = classes ? classes.content : undefined;

    return (
        <div id="wizard-container" className={wzdContainerClass} style={wzdContainerStyle}>
            <div className={wzdWindowClass} style={wzdWindowStyle}>
                {isError() && ErrorMdl ? (
                    <ErrorMdl
                        componentState={componentState}
                        wizardState={wizardState}
                        error={wizardState._error}
                        openModal={wizardState._errorModal}
                        setOpenModal={setOpenErrorModal}
                        reset={reset}
                    />
                ) : (
                    <div className={wzdContentClass} style={wzdContentStyle}>
                        {isLastStep() && FinishMdl ? (
                            <FinishMdl
                                openModal={wizardState._finishModal}
                                setOpenModal={setOpenFinishModal}
                                componentState={componentState}
                                wizardState={wizardState}
                                finishWizard={() => reset()}
                            />
                        ) : null}
                        {isWarning() && WarningMdl ? (
                            <WarningMdl
                                openModal={wizardState._warningModal}
                                setOpenModal={setOpenWarningModal}
                                refresh={refresh}
                                componentState={componentState}
                                wizardState={wizardState}
                                next={() => next(true)}
                            />
                        ) : null}

                        {isLoader() ? (
                            <Loader/>
                        ) : (
                            isFlow(CurrentComponent) ? <BooksFlow abort={abort} xml={CurrentComponent} ref={flowRef}/>
                                : <CurrentComponent
                                    componentState={componentState}
                                    wizardState={wizardState}
                                    change={change}
                                    refresh={refresh}
                                    innerTasks={innerTasks()}
                                    abort={abort}
                                    next={next}
                                />
                        )}
                    </div>
                )}
            </div>
            <Footer
                componentState={componentState}
                wizardState={wizardState}
                back={() => back(isFlow(CurrentComponent))}
                next={isLastStep() ? () => finish() : () => nextClick(isFlow(CurrentComponent))}
                backDisabled={isBackDisabled()}
                nextDisabled={isNextDisabled()}
                nextDisabledTooltip={nextDisabledTooltip()}
                isLastStep={isLastStep()}
                isFirstStep={isFirstStep(isFlow(CurrentComponent))}
                nextBtnLabel={currentWorkflow.nextBtnLabel}
                clean={clean}
            />
        </div>
    );
};

export default GsuWizard;
