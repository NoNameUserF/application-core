import styles from "./index.module.css";
import eStyles from '../index.module.css'
import cn from "classnames/dedupe";
import React, {FC, useRef, useState} from "react";
import GsuSelectIcon from "../../GsuSelectIcon";
import {IOptions} from "../../../types/globalTypes";
import GsuDropDown from "../GsuDropDown";

interface GsuOptionsNumberInputProps {
    placeholder?: string;
    value: number;
    onChangeValue: (value: number) => void;
    optionValue: string;
    options: IOptions;
    onChangeOption: (key: string) => void;
    error?: string;
}

const GsuOptionsNumberInput: FC<GsuOptionsNumberInputProps> = ({
                                                                   placeholder = "", value,
                                                                   onChangeValue, optionValue,
                                                                   options, onChangeOption, error
                                                               }) => {

    const [openSelect, setOpenSelect] = useState(false);
    const [searchValue, setSearchValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);


    const toggleOpenDropDown = () => {
        if (!openSelect) {
            setOpenSelect(true);
        } else {
            setOpenSelect(false);
        }
    }
    const handleClose = () => {
        setOpenSelect(false);
    }

    const handleOptionClick = (option: string) => {
        onChangeOption(option);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 16) {
            return;
        }

        if (e.target.value === "") {
            onChangeValue(0);
        } else if (/^[0-9]+$/.test(e.target.value.toString())) {
            onChangeValue(Number(e.target.value));
        }
    };


    const filteredOptions: IOptions = Object.fromEntries(
        Object.entries(options).filter(([, currency]) =>
            currency.label.toLowerCase().includes(searchValue.toLowerCase()),
        ),
    );

    return (
        <div className={cn(eStyles.inputContainer)}>
            <div tabIndex={-1}
                 className={cn(eStyles.inputWrapper, {[eStyles.opened]: openSelect}, {[eStyles.filled]: !!value}, {[eStyles.error]: !!error})}
            >
                <input
                    ref={inputRef}
                    onClick={handleClose}
                    className={cn(eStyles.input, {[eStyles.errorText]: !!error})}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}/>
                <div className={styles.optionsNumberSeparatorBlock}>
                    <div className={styles.optionsNumberSeparator}></div>
                    <div onClick={toggleOpenDropDown} className={styles.gsuInputValueContainer} ref={iconRef}>
                        <p className={styles.gsuInputValue}>{optionValue}</p>
                        <div
                            className={cn(eStyles.icon, styles.iconOptions,
                                {[eStyles.openIcon]: openSelect}, {[styles.iconOptionsOpen]: openSelect})}
                        >
                            <GsuSelectIcon/>
                        </div>
                    </div>
                </div>

                <GsuDropDown
                    hasDefaultValue={false}
                    closeOnSelect={true}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    onClick={handleOptionClick}
                    close={handleClose}
                    isOpen={openSelect}
                    options={filteredOptions}
                    inputRef={inputRef}
                    iconRef={iconRef}
                    listName={"Список доступных валют"}
                />

            </div>

            {error && <p className={cn(eStyles.errorText, eStyles.errorLabel)}>{error}</p>}
        </div>
    );
};

export default GsuOptionsNumberInput;
