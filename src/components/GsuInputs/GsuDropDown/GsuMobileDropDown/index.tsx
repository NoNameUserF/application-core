import React, {FC, useCallback, useMemo} from "react";
import {List, AutoSizer, ListRowProps} from "react-virtualized";
import styles from "./index.module.css";
import {IOptions} from "../../../../types/globalTypes";
import {ArrowBackGrey, CheckMarkIcon, NotFound} from "../../../../assets/Icons";
import WidgetModalBox from "../../../WidgetModalBox";
import {GsuInputSearch} from "../../GsuInputSearch";
import cn from "classnames/dedupe";

interface GsuMobileDropDownProps {
    openMobileAutocomplete: boolean;
    closeMobileAutocomplete: () => void;
    options: IOptions;
    onOptionSelect: (key: string) => void;
    listName: string;
    values?: string | string[];
    closeOnSelect: boolean;
    searchValue: string;
    setSearchValue: (value: string) => void;
}

export const GsuMobileDropDown: FC<GsuMobileDropDownProps> = ({
                                                                  openMobileAutocomplete,
                                                                  closeMobileAutocomplete,
                                                                  options,
                                                                  onOptionSelect,
                                                                  listName,
                                                                  values,
                                                                  searchValue,
                                                                  setSearchValue,
                                                                  closeOnSelect,
                                                              }) => {
    // Convert options object into array for virtualization
    const entries = useMemo(() => Object.entries(options), [options]);

    const handleClose = useCallback(() => {
        closeMobileAutocomplete();
    }, [closeMobileAutocomplete]);

    const handleChange = useCallback(
        (value: string) => {
            setSearchValue(value);
        },
        [setSearchValue]
    );

    const handleOptionClick = useCallback(
        (key: string) => {
            onOptionSelect(key);
            if (closeOnSelect) {
                closeMobileAutocomplete();
            }
        },
        [onOptionSelect, closeOnSelect, closeMobileAutocomplete]
    );

    const checkMarkItems = useCallback(
        (key: string) => {
            if (!values) return false;
            return Array.isArray(values) ? values.includes(key) : values === key;
        },
        [values]
    );

    const rowRenderer = ({index, key, style}: ListRowProps) => {
        const [itemKey, autocompleteItem] = entries[index];
        const isChecked = checkMarkItems(itemKey);

        return (
            <div
                key={key}
                style={style}
                className={styles.mobileAutocompleteWrapper}
                onClick={() => handleOptionClick(itemKey)}
            >
                <div className={cn(styles.mobileAutocompleteInner, {[styles.autocompleteHighlight]: isChecked})}>
                    <div
                        className={styles.mobileAutocompleteContent}
                    >
                        { (autocompleteItem.Icon && typeof autocompleteItem.Icon === "string") && (
                            <h6 className={styles.mobileEmoji}>{autocompleteItem.Icon}</h6>
                        )}
                        {(autocompleteItem.Icon && typeof autocompleteItem.Icon !== "string") && (
                            <div className={styles.mobileAutocompleteImg}>
                                <autocompleteItem.Icon/>
                            </div>
                        )}
                        <p className={styles.mobileAutocompleteLabel}>
                            {autocompleteItem.label}
                        </p>
                    </div>
                    {isChecked && <CheckMarkIcon/>}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.mobileAutocmplete}>
            <WidgetModalBox open={openMobileAutocomplete} setOpen={handleClose}>
                <div className={styles.gsuMobileAutocomplete}>
                    <div className={styles.mobileAutocompleteInfo}>
                        <button
                            className={styles.mobileAutocompleteButton}
                            onClick={handleClose}
                        >
                            <ArrowBackGrey/>
                        </button>
                        <p className={styles.mobileAutocompleteInfoText}>{listName}</p>
                    </div>
                    <GsuInputSearch
                        value={searchValue}
                        placeholder="Найти"
                        handleChange={handleChange}
                    />
                    <div className={styles.mobileAutocompleteItemsWrapper}>
                        {entries.length > 0 ? (
                            <AutoSizer>
                                {({width, height}) => (
                                    <List
                                        width={width}
                                        height={height}  // Fixed height or make dynamic as needed
                                        rowCount={entries.length}
                                        rowHeight={44}  // Adjust based on item size
                                        rowRenderer={rowRenderer}
                                        overscanRowCount={5}
                                        style={{overscrollBehavior: "contain"}}
                                    />
                                )}
                            </AutoSizer>
                        ) : (
                            <div className={styles.mobileAutocompleteNotFound}>
                                <NotFound/>
                                <p className={styles.mobileAutocompleteNotFoundText}>
                                    Ничего не найдено
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </WidgetModalBox>
        </div>
    );
};