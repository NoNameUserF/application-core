import React, {
    FC,
    RefObject,
    useEffect,
    useMemo,
    useRef,
    useState,
    useCallback
} from 'react';
import {List, AutoSizer, ListRowRenderer} from 'react-virtualized';
import cn from 'classnames/dedupe';
import styles from './index.module.css';
import {IOptions} from '../../../../types/globalTypes';
import {CheckMarkIcon} from '../../../../assets/Icons';

interface GsuDesktopDropDownProps {
    inputRef: RefObject<HTMLInputElement>;
    iconRef: RefObject<HTMLDivElement>;
    options: IOptions;
    isOpen: boolean;
    values?: string[];
    onClick: (key: string) => void;
    close: () => void;
    setResetHighlightIndex?: (fn: () => void) => void;
    closeOnSelect: boolean;
}

export const GsuDesktopDropDown: FC<GsuDesktopDropDownProps> = ({
                                                                    inputRef,
                                                                    iconRef,
                                                                    options,
                                                                    isOpen,
                                                                    onClick,
                                                                    close,
                                                                    closeOnSelect,
                                                                    values,
                                                                    setResetHighlightIndex
                                                                }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<List>(null);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const entries = useMemo(() => Object.entries(options), [options]);

    useEffect(() => {
        setResetHighlightIndex?.(() => () => setHighlightedIndex(-1));
    }, [setResetHighlightIndex]);

    const handleClick = useCallback((key: string) => {
        if (closeOnSelect) close();
        onClick(key);
    }, [closeOnSelect, close, onClick]);

    const isMobile = () => {
        return window.innerWidth <= 880;
    }

    const clickOutside = useCallback((e: MouseEvent | TouchEvent) => {
        if (isMobile()) {
            return
        }

        const t = e.target as Node;
        if (
            containerRef.current?.contains(t) === false &&
            inputRef.current?.contains(t) === false &&
            iconRef.current?.contains(t) === false
        ) {
            close();
        }
    }, [close, inputRef, iconRef]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isOpen) return;
        let next = highlightedIndex;
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                next = highlightedIndex < entries.length - 1 ? highlightedIndex + 1 : 0;
                setHighlightedIndex(next);
                break;
            case 'ArrowUp':
                e.preventDefault();
                next = highlightedIndex > 0 ? highlightedIndex - 1 : entries.length - 1;
                setHighlightedIndex(next);
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0) {
                    handleClick(entries[highlightedIndex][0]);
                }
                break;
            case 'Escape':
                close();
                return;
        }
        listRef.current?.scrollToRow(next);
    }, [isOpen, highlightedIndex, entries, handleClick, close]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', clickOutside);
            document.addEventListener('touchstart', clickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('mousedown', clickOutside);
            document.removeEventListener('touchstart', clickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, clickOutside, handleKeyDown]);

    const rowRenderer: ListRowRenderer = ({index, key, style}) => {
        const [optKey, opt] = entries[index];
        const isSel = values?.includes(optKey);
        const isHover = index === highlightedIndex;

        return (
            <div
                key={key}
                style={style}
                className={styles.option}
                onClick={() => handleClick(optKey)}
                onMouseEnter={() => setHighlightedIndex(index)}
            >
                <div className={cn(styles.optionInner, {[styles.optionHighlight]: isHover || isSel})}>
                <div className={styles.optionDropDownItemDescription}>
                    <div className={styles.optionDropDownItemDescriptionContent}>
                        {(opt.Icon && typeof opt.Icon !== "string") && (
                            <div className={styles.optionDropDownItemDescriptionImgSrc}>
                                <opt.Icon/>
                            </div>
                        )}
                        {(opt.Icon && typeof opt.Icon === "string") && (
                            <h6 className={styles.optionDropDownItemDescriptionImg}>
                                {opt.Icon}
                            </h6>
                        )}
                        <p className={styles.optionDropDownItemDescriptionText}>
                            {opt.label}
                        </p>
                    </div>
                    {isSel && <CheckMarkIcon/>}
                </div>
                </div>
            </div>
        );
    };

    const isUp = () => {
        if (!inputRef.current) return false;
        return window.innerHeight < inputRef.current.getBoundingClientRect().bottom + 280;
    };

    return (
        <>
            {isOpen && (
                <div
                    ref={containerRef}
                    className={cn(styles.options, {[styles.optionsTop]: isUp()})}
                >
                    {entries.length === 0 ? (
                        <p className={styles.notFound}>Ничего не найдено</p>
                    ) : (
                        <div className={styles.listContainer}>
                            <AutoSizer disableHeight>
                                {({width}) => (
                                    <List
                                        ref={listRef}
                                        width={width}
                                        height={Math.min(entries.length, 5) * 44
                                    }

                                        rowCount={entries.length}
                                        rowHeight={44}
                                        rowRenderer={rowRenderer}
                                        overscanRowCount={5}
                                        scrollToIndex={highlightedIndex}
                                        style={{ outline: "none" }}
                                    />
                                )}
                            </AutoSizer>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default GsuDesktopDropDown;