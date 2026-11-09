import cn from "classnames/dedupe";
import React, {FC, HTMLInputAutoCompleteAttribute} from "react";
import eStyles from '../index.module.css'

interface GsuInputProps {
    placeholder?: string;
    error: string,
    onChange: (value: string) => void,
    value: string
}

const GSUInput: FC<GsuInputProps> = ({placeholder, error, value = "", onChange}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }

    return (
        <div className={cn(eStyles.inputContainer)}>
            <div tabIndex={-1} className={cn(eStyles.inputWrapper, {[eStyles.filled]: !!value}, {[eStyles.error]: !!error})}>
                <input
                    type={'text'}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    className={cn(eStyles.input, {[eStyles.errorText]: !!error})}
                />
            </div>
            {error && <p className={cn(eStyles.errorText, eStyles.errorLabel)}>{error}</p>}
        </div>
    );
};

export default GSUInput;
