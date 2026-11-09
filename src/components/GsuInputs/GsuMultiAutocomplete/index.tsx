import React, {useState, useRef, FC, useEffect} from "react";
import cn from "classnames/dedupe";
import eStyles from '../index.module.css'
import GsuSelectIcon from "../../GsuSelectIcon";
import {IOptions} from "../../../types/globalTypes";
import GsuDropDown from "../GsuDropDown";
import showGsuAlert from "../../GsuAlert";
import * as sea from "node:sea";

interface GsuMultiAutocompleteProps {
    options: IOptions;
    onOptionsSelect: (keys: string[]) => void;
    placeholder: string;
    listName: string;
    values: string[],
    hasDefaultValue: boolean;
    minValuesLength?: number;
    onAddMessage?: (label: string) => string;
    onRemoveMessage?: (label: string) => string;
}

const GsuMultiAutocomplete: FC<GsuMultiAutocompleteProps> = ({
                                                                 options,
                                                                 onOptionsSelect,
                                                                 placeholder,
                                                                 listName,
                                                                 values,
                                                                 hasDefaultValue,
                                                                 onAddMessage,
                                                                 onRemoveMessage,
                                                                 minValuesLength = 1
                                                             }) => {


    const [searchValue, setSearchValue] = useState("");
    const [openSelect, setOpenSelect] = useState<boolean>(false);
    const [resetHighlightIndex, setResetHighlightIndex] = useState<(resetFunction: () => void) => void>(() => {
    });

    const inputRef = useRef<HTMLInputElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const handleOpen = () => {
        setOpenSelect(true);
    };

    const handleClose = () => {
        if (values.length) {
            setSearchValue("");
        }
        setOpenSelect(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        setOpenSelect(true);
        if (resetHighlightIndex) {
            resetHighlightIndex(() => {
            });
        }
    };

    const handleOptionClick = (key: string) => {
        const hasSearchValue = !!searchValue;
        const label = options[key].label;
        let itemRemoved = false;

        setSearchValue("");

        let newKeys = [...values];
        const defaultValue = Object.keys(options)[0];

        if (hasDefaultValue) {
            if (key === defaultValue) {
                newKeys = [key];
                onOptionsSelect(newKeys);
                handleClose();
                return;
            }
        }


        const index = newKeys.indexOf(key);
        if (index !== -1) {
            newKeys.splice(index, 1);
            itemRemoved = true;
        } else {
            newKeys.push(key);
        }

        if (hasDefaultValue) {
            if (newKeys.length === Object.keys(options).length - 1) {
                newKeys = [defaultValue];
                onOptionsSelect(newKeys);
                handleClose();
                return;
            }
        }

        if (hasDefaultValue && newKeys.includes(defaultValue)) {
            newKeys.splice(newKeys.indexOf(defaultValue), 1);
        }

        if (hasSearchValue) {
            if (itemRemoved && onRemoveMessage) {
                showGsuAlert(onRemoveMessage(label), true, 3000);
            } else if (!itemRemoved && onAddMessage) {
                showGsuAlert(onAddMessage(label), true, 3000);
            }
        }

        onOptionsSelect(newKeys);
    };

    const mobileOpen = () => {
        const width = window.innerWidth <= 880;

        if (width) {
            setOpenSelect(true)
        }

    };
    const filteredOptions: IOptions = Object.fromEntries(
        Object.entries(options).filter(([, autocompleteItem]) =>
            autocompleteItem.label.toLowerCase().includes(searchValue.toLowerCase()),
        ),
    );


    return (
        <div className={cn(eStyles.inputContainer)}>
            <div tabIndex={-1}
                 className={cn(eStyles.inputWrapper, {[eStyles.opened]: openSelect}, {[eStyles.filled]: values.length >= minValuesLength})}
                 onClick={mobileOpen}
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={searchValue}
                    placeholder={placeholder}
                    className={cn(eStyles.input, eStyles.noMobile, {[eStyles.inputFilled]: values.length >= minValuesLength})}
                    onClick={handleOpen}
                    onChange={handleChange}
                />
                <div
                    ref={iconRef}
                    className={`${eStyles.icon} ${openSelect ? eStyles.openIcon : ""}`}
                    onClick={openSelect ? handleClose : handleOpen}>
                    <GsuSelectIcon/>
                </div>
            </div>
            <GsuDropDown
                closeOnSelect={false}
                values={values}
                setResetHighlightIndex={setResetHighlightIndex}
                onClick={handleOptionClick}
                close={(handleClose)}
                isOpen={openSelect}
                options={filteredOptions}
                inputRef={inputRef}
                iconRef={iconRef}
                listName={listName}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                hasDefaultValue={hasDefaultValue}/>
        </div>
    );
};

export default GsuMultiAutocomplete;
