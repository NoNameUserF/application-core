import React, {
    useEffect,
    useState,
    forwardRef,
    ForwardRefRenderFunction, useImperativeHandle,
} from "react";
import {GsuError, GsuWizardFlowHandles} from "../../../types/globalTypes";
import GsuWizardFlowInner from "../GsuWizardFlowInner";
import {fetchXML} from "../../../utils/xmlUtils";

export interface BooksFlowProps {
    xml: string;
    abort: (error: GsuError) => void;
}

const GsuWizardFlow: ForwardRefRenderFunction<
    GsuWizardFlowHandles,
    BooksFlowProps
> = (props, ref) => {
    const [flow, setFlow] = useState<any>(null);

    const innerRef = React.useRef<GsuWizardFlowHandles>(null);

    useEffect(() => {
        fetchXML(props.xml).then((parsed) => {
            setFlow(parsed);
        }).catch(error => {
            setFlow(null);
            props.abort("XML Read Error");
        });
    }, []);

    useImperativeHandle(ref, () => ({
        next: () => {
            return innerRef.current ? innerRef.current.next() : {flow: null, finished: false};
        },
        back: () => {
            innerRef.current?.back();
        },
    }));

    return (
        <div>
            {flow && (
                <GsuWizardFlowInner
                    ref={innerRef}
                    flowQuestions={flow.flow.question}
                />
            )}
        </div>
    );
};


export default forwardRef(GsuWizardFlow);