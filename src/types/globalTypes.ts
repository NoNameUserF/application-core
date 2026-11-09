import {FC} from "react";

export interface NavBarIconProps {
    active: boolean;
}

export interface IOption {
    label: string;
    Icon?: FC | string;
}

export interface IOptions<T extends IOption = IOption> {
    [key: string]: T;
}


export interface IRoute {
    path: string,
    name: string,
    component: FC,
    icon: FC<NavBarIconProps>,
}

export interface IInnerTask<T, TResponse = any, TProps = any> {
    fetch: (
        componentState: T,
        wizardState: IWizardState,
        props?: TProps
    ) => Promise<TResponse>;

    callback: (
        componentState: T,
        wizardState: IWizardState,
        fetchResponse: TResponse,
        props?: TProps
    ) => T;
}

export interface IInnerTasks<T> {
    [taskName: string]: IInnerTask<T>;
}

export interface IWorkflowStep<T, K = any, R = any> {
    uid: string;
    name: string;
    clearable?: boolean;
    nextBtnLabel?: string;
    initState: () => T;
    cleanState?: () => T;
    storageDependencies?: string[];
    component: (previousComponentState: K, componentState: T, wizardState: IWizardState) => FC<IWizardStep<T>> | string;
    isNextDisabled?: (componentState: T, wizardState: IWizardState) => boolean;
    nextDisabledTooltip?: (componentState: T, wizardState: IWizardState) => string;
    fetch?: (componentState: T, wizardState: IWizardState) => Promise<R>;
    callback?: (componentState: T, wizardState: IWizardState, fetchResponse: R) => unknown;
    refresh?: (previousComponentState: K, componentState: T, wizardState: IWizardState) => Promise<unknown>;
    warningModal? : (componentState: T, wizardState: IWizardState) => FC<IWarningModal<T>>
    showWarning? : (componentState: T, wizardState: IWizardState) => boolean
    isBackDisabled? : (componentState: T, wizardState: IWizardState) => boolean;
    innerTasks?: (componentState: T, wizardState: IWizardState, abort: (error: GsuError) => void) => IInnerTasks<T>;
}

export interface IWarningModal<T> {
    componentState: T;
    wizardState: IWizardState;
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    next: () => void;
    refresh: () => void;
}

export interface StepperProps {
    steps: string[],
    step: number
}

export interface IErrorModal<T> {
    componentState: T;
    wizardState: IWizardState;
    error: GsuError;
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    reset: () => void
}

export interface GsuWizardFooterProps {
    componentState: unknown;
    wizardState: IWizardState;
    back: () => void;
    backDisabled: boolean;
    next: () => void;
    nextDisabled: boolean;
    nextDisabledTooltip?: string;
    isLastStep: boolean;
    isFirstStep: boolean;
    nextBtnLabel?: string;
    clean: () => void;
}

export interface IFinishModal<T> {
    componentState: T
    wizardState: IWizardState
    openModal: boolean
    setOpenModal: (value: boolean) => void
    finishWizard: () => void
}

export interface GsuSpinnerProps {
    spinnerWeight?: number;
    color?: string;
}

export interface IWizardStep<T> {
    componentState: T;
    wizardState: IWizardState;
    change: (childData: T) => void;
    refresh: () => void;
    innerTasks: Record<string, (props?: unknown) => void>;
    abort: (error: GsuError) => void;
    next: (force?: boolean) => void;
}

export interface IWizardBaseState {
    _idx: number;
    _flowQuesIdx: number,
    _flowFinished: boolean,
    _id: string;
    _loader: boolean;
    _finishModal: boolean;
    _warningModal: boolean;
    _errorModal: boolean;
    _error: GsuError;
}

export type IWizardState = IWizardBaseState & {
    [key: string]: unknown;
};


export interface FileData {
    src: string | ArrayBuffer | null,
    file: File,
}

export interface GsuSelectGridContentProps<T> {
    isRowSelected: boolean;
    row: T;
}

export interface GsuPageGridContentProps<T> {
    row: T;
}

export interface GsuPageGridFooterProps {
    onNext: () => void,
    onBack: () => void,
    nextDisabled: boolean,
    backDisabled: boolean,
    pageSize: number,
    page: number,
}

export interface GsuSelectCartProps<T> {
    card: T;
}

export interface IGsuServerError {
    status: number
    link: string;
}

export interface GsuWizardFlowNextState {
    finished: boolean,
    flow: any
}

export interface GsuWizardFlowHandles {
    next: () => GsuWizardFlowNextState;
    back: () => void;
}
export type GsuError = IGsuServerError | string | null | undefined;