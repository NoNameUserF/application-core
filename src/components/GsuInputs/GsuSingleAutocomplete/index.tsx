import React, {useState, useRef, FC} from "react";
import cn from "classnames/dedupe";
import styles from "../index.module.css"
import eStyles from '../index.module.css'
import GsuDropDown from "../GsuDropDown";
import GsuSelectIcon from "../../GsuSelectIcon";
import {IOptions} from "../../../types/globalTypes";

interface GsuSingleAutocompleteProps {
    options: IOptions;
    onOptionSelect: (key: string) => void;
    placeholder: string;
    listName: string;
    value: string | null,
}

const GsuSingleAutocomplete: FC<GsuSingleAutocompleteProps> = ({
                                                                   options,
                                                                   onOptionSelect,
                                                                   placeholder,
                                                                   listName,
                                                                   value,
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
        if (value) {
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

    const mobileOpen = () => {
        const width = window.innerWidth <= 880;

        if (width) {
            setOpenSelect(true)
        }

    };

    const handleOptionClick = (key: string) => {
        setSearchValue("");
        if (resetHighlightIndex) {
            resetHighlightIndex(() => {
            });
        }
        onOptionSelect(key);
    };

    const filteredOptions: IOptions = Object.fromEntries(
        Object.entries(options).filter(([, autocompleteItem]) =>
            autocompleteItem.label.toLowerCase().includes(searchValue.toLowerCase()),
        ),
    );


    return (
        <div className={cn(eStyles.inputContainer)}>
            <div tabIndex={-1}
                 className={cn(eStyles.inputWrapper, {[eStyles.opened]: openSelect}, {[eStyles.filled]: !!value})}
                 onClick={mobileOpen}
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={searchValue}
                    placeholder={value ? options[value].label : placeholder}
                    className={cn(eStyles.input, eStyles.noMobile, {[eStyles.inputFilled]: !!value})}
                    onClick={handleOpen}
                    onTouchStart={handleOpen}
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
                hasDefaultValue={false}
                closeOnSelect={true}
                setResetHighlightIndex={setResetHighlightIndex}
                onClick={handleOptionClick}
                close={handleClose}
                isOpen={openSelect}
                options={filteredOptions}
                inputRef={inputRef}
                iconRef={iconRef}
                listName={listName}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
        </div>
    );
};

export default GsuSingleAutocomplete;
