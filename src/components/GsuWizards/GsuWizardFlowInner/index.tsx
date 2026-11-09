import {FC, forwardRef, ForwardRefRenderFunction, useImperativeHandle, useState} from "react";
import {getDataFromStorage, storeDataToStorage} from "../../../utils/localStorageUtils";
import {GsuWizardFlowHandles, GsuWizardFlowNextState, IOptions} from "../../../types/globalTypes";
import GsuWizardGroupContainer from "../GsuWizardGroupContainer";
import GsuWizardSection from "../GsuWizardSection";
import GsuButtonSelect from "../../GsuButtonSelects/GsuButtonSelect";
import GsuButtonSingleSelect from "../../GsuButtonSelects/GsuButtonSingleSelect";

const removeFirstElement = (arr: any[]) => {
    arr.shift();
    return arr;
}

interface GsuWizardFlowState {
    _finished: boolean;
    _questionsList: Question[];
    _prevQuestionsList: Question[];
    _value: string | string[];
    _flow: Flow
}

interface Question {
    answer: Answer[];
    _attributes: QuestionAttributes;
}

interface QuestionAttributes {
    label: string;
    type: "many" | "one";
    key: string;
}

interface Answer {
    question?: Question | Question[];
    _attributes: AnswerAttributes
}

interface AnswerAttributes {
    key: string,
    label: string
}

interface GsuWizardFlowProps {
    flowQuestions: Question | Question[];
}

interface Flow {
    questions: QuestionDto[];
}

interface QuestionDto {
    question: string;
    answer?: string;
    answers?: string[];
    questions?: QuestionDto[];
}

const findQuestionDto = (key: string, flow: QuestionDto[]): QuestionDto | undefined => {
    for (const questionDto of flow) {
        if (questionDto.question === key) {
            return questionDto;
        } else {
            if (questionDto.questions) {
                const dto = findQuestionDto(key, questionDto.questions);
                if (dto) {
                    return dto;
                }
            }
        }
    }
}

const getFirstOptionKey = (question: Question) => {
    if (question._attributes.type === "one") {
        return question.answer[0]._attributes.key;
    }
    return [question.answer[0]._attributes.key];
}

const getValueFromStorage = (question: Question) => {
    const valueFromStorage = getDataFromStorage(`BOOKS_${question._attributes.key}`);
    return valueFromStorage ? valueFromStorage : getFirstOptionKey(question);
}

const GsuWizardFlowInner: ForwardRefRenderFunction<
    GsuWizardFlowHandles,
    GsuWizardFlowProps
> = ({flowQuestions}, ref) => {
    const _questions: Question[] = Array.isArray(flowQuestions) ? flowQuestions : [flowQuestions];
    const _questionsFlow: QuestionDto[] = _questions.map((_question) => {
        return {
            question: _question._attributes.key
        }
    })

    const [flowState, setFlowState] = useState<GsuWizardFlowState>(() => ({
        _finished: false,
        _questionsList: _questions,
        _prevQuestionsList: [],
        _value: getValueFromStorage(_questions[0]),
        _flow: {questions: _questionsFlow},
    }));

    const setValue = (value: string | string[]) => {
        storeDataToStorage(`BOOKS_${flowState._questionsList[0]._attributes.key}`, value)
        setFlowState({
            ...flowState,
            _value: value
        })
    }

    const getOptions = () => {
        const answers = flowState._questionsList[0].answer;
        const options: IOptions = {}
        answers.forEach((answer) => {
            const a_attributes = answer._attributes;
            options[a_attributes.key] = {label: a_attributes.label}
        })
        return options;
    }

    const next = (): GsuWizardFlowNextState => {
        if (flowState._questionsList[0]._attributes.type === "one") {
            return nextIntoDepth();
        } else {
            return nextDefault();
        }
    }

    const nextIntoDepth = (): GsuWizardFlowNextState => {
        let answers = flowState._questionsList[0].answer;
        answers = answers.filter((answer) => answer._attributes.key === flowState._value);
        const answer = answers[0];

        if (!answer.question) {
            return nextDefault();
        } else {
            const questions = Array.isArray(answer.question) ? answer.question : [answer.question];

            const dto = findQuestionDto(flowState._questionsList[0]._attributes.key, flowState._flow.questions);
            if (dto) {
                dto.answer = flowState._value as string;
                if (!dto.questions) {
                    dto.questions = [];
                }
            }
            if (dto && dto.questions) {
                questions.forEach((question) => {
                    if (dto.questions) {
                        dto.questions.push({
                            question: question._attributes.key
                        })
                    }
                })
            }

            setFlowState({
                ...flowState,
                _prevQuestionsList: [...flowState._prevQuestionsList, flowState._questionsList[0]],
                _questionsList: [...questions, ...removeFirstElement(flowState._questionsList)],
                _value: getValueFromStorage(questions[0]),
            });
            return {
                finished: false,
                flow: flowState._flow,
            }
        }
    };

    const nextDefault = (): GsuWizardFlowNextState => {
        const dto = findQuestionDto(flowState._questionsList[0]._attributes.key, flowState._flow.questions);
        if (dto) {
            if (Array.isArray(flowState._value)) {
                dto.answers = flowState._value as string[];
            } else {
                dto.answer = flowState._value as string;
            }
        }

        if (flowState._questionsList.length === 1) {
            setFlowState({
                ...flowState,
                _finished: true,
                _prevQuestionsList: [...flowState._prevQuestionsList, flowState._questionsList[0]],
                _value: "finished_dummy",
                _questionsList: [],
            });
            return {
                finished: true,
                flow: flowState._flow,
            };
        } else {
            setFlowState({
                ...flowState,
                _prevQuestionsList: [...flowState._prevQuestionsList, flowState._questionsList[0]],
                _questionsList: removeFirstElement(flowState._questionsList),
                _value: getValueFromStorage(flowState._questionsList[0]),
            });
            return {
                finished: false,
                flow: flowState._flow,
            }
        }
    }

    const back = () => {
        if (isBackBtnDisabled()) {
            return;
        }

        const prevQuestion = flowState._prevQuestionsList[flowState._prevQuestionsList.length - 1];
        let removedQuestionList: (Question | undefined)[] = [];
        const answers = prevQuestion.answer;
        answers.forEach((answer) => {
            const questions = Array.isArray(answer.question) ? answer.question : [answer.question];
            removedQuestionList = [...removedQuestionList, ...questions];
        })

        let questionList = flowState._questionsList.filter(question => !removedQuestionList.includes(question));

        const dto = findQuestionDto(prevQuestion._attributes.key, flowState._flow.questions);
        if (dto) {
            if (prevQuestion._attributes.type === "one") {
                delete dto.answer;
            } else {
                delete dto.answers;
            }
            delete dto.questions;
        }

        setFlowState({
            ...flowState,
            _finished: false,
            _questionsList: [prevQuestion, ...questionList],
            _prevQuestionsList: flowState._prevQuestionsList.slice(0, -1),
            _value: getValueFromStorage(prevQuestion),
        });
    };

    const isBackBtnDisabled = () => {
        return !flowState._prevQuestionsList.length;
    }

    const options = flowState._finished ? {} : getOptions();

    useImperativeHandle(ref, () => ({next, back}));

    return (
        <GsuWizardGroupContainer>
            {flowState._finished ?
                <div>
                    <div>Finished</div>
                </div> :
                <GsuWizardSection descriptionText={flowState._questionsList[0]._attributes.label}>
                    {flowState._questionsList[0]._attributes.type === "one" ?
                        <GsuButtonSingleSelect
                            options={options}
                            value={flowState._value as string}
                            change={setValue}
                        /> :

                        <GsuButtonSelect
                            options={options}
                            change={setValue}
                            values={flowState._value as string[]}/>
                    }
                </GsuWizardSection>
            }


            <div style={{display: "flex", flexDirection: "column", rowGap: 20, marginTop: 30}}>
                {flowState._questionsList.length > 0 ? <div>
                    <span>current question: </span>
                    <span>{flowState._questionsList[0]._attributes.key}</span>
                </div> : null}

                {<div>
                    <span>value: </span>
                    <span>{flowState._value}</span>
                </div>}

                {<div>
                    <span>question list: </span>
                    <span>{flowState._questionsList.map((ques) => ques._attributes.key).join(", ")}</span>
                </div>}

                {<div>
                    <span>prev question list: </span>
                    <span>{flowState._prevQuestionsList.map((ques) => ques._attributes.key).join(", ")}</span>
                </div>}

                {<div>
                    <span>request: </span>
                    <textarea style={{width: 600, height: 300}}
                              value={JSON.stringify({flow: flowState._flow}, null, 2)}/>
                </div>}
            </div>
        </GsuWizardGroupContainer>
    );
}

export default forwardRef(GsuWizardFlowInner);