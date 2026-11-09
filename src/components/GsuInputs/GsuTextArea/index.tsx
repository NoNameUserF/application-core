import cn from "classnames/dedupe";

import styles from "./index.module.css";
import eStyles from '../index.module.css'
import React, {FC} from "react";

interface GsuTextAreaProps {
    placeholder?: string;
    error?: string;
    value?: string;
    onChange: (value: string) => void;
    height?: string | number;
}

const GsuTextArea: FC<GsuTextAreaProps> = ({
                                               placeholder,
                                               error,
                                               value = "",
                                               onChange,
                                               height = "100px"
                                           }) => {

    const change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value)
    }

    return (
        <div className={cn(eStyles.inputContainer)}>
            <div tabIndex={-1}
                 className={cn(eStyles.inputWrapper, styles.textAreaWrapper, {[eStyles.filled]: !!value}, {[eStyles.error]: !!error})}>
				<textarea
                    className={cn(eStyles.input, styles.textArea, {[eStyles.errorText]: !!error})}
                    placeholder={placeholder}
                    style={{height: height}}
                    value={value}
                    onChange={change}
                />
            </div>
            {error && <p className={cn(eStyles.errorText, eStyles.errorLabel)}>{error}</p>}
        </div>
    );
};

export default GsuTextArea;
