import React, {FC} from 'react'
import {SearchIcon} from "../../../assets/Icons";
import eStyles from '../index.module.css'
import styles from './index.module.css'
import cn from 'classnames'

interface GsuInputSearchProps {
    value: string;
    handleChange: (value: string) => void;
    placeholder: string;
}

export const GsuInputSearch: FC<GsuInputSearchProps> = ({value, handleChange, placeholder}) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e.target.value);
    }

    return (
        <div className={cn(eStyles.inputContainer)}>
            <div tabIndex={-1}
                 className={cn(eStyles.inputWrapper, styles.inputWrapperWithImage, {[eStyles.filled]: !!value})}>
                <SearchIcon/>
                <input
                    className={cn(eStyles.input, styles.inputWithImage)}
                    value={value}
                    onChange={onChange}
                    type="text"
                    placeholder={placeholder}/>
            </div>
        </div>
    )
}
