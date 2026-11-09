import {FC, RefObject} from "react"
import { GsuMobileDropDown } from "./GsuMobileDropDown";
import GsuDesktopDropDown from "./GsuDesktopDropDown";
import {IOptions} from "../../../types/globalTypes";

interface GsuDropDownProps {
	close: () => void;
	isOpen: boolean;
	options: IOptions;
	onClick: (key: string) => void;
	inputRef: RefObject<HTMLInputElement>;
	iconRef: RefObject<HTMLDivElement>;
	listName: string;
	setResetHighlightIndex?: (resetFunction: () => void) => void;
	searchValue : string ;
	values?: string[];
    closeOnSelect : boolean;
	setSearchValue : (value :string) => void;
	hasDefaultValue: boolean;
}

const GsuDropDown: FC<GsuDropDownProps> = ({
	close, isOpen,
	options, onClick,
	inputRef, iconRef,
	listName,
	setResetHighlightIndex,
	setSearchValue,
	values,
    closeOnSelect,
	searchValue,
	hasDefaultValue
}) => {


	return (
		 <>
			<GsuDesktopDropDown
                closeOnSelect={closeOnSelect}
                values={values}
				inputRef={inputRef}
				iconRef={iconRef}
				options={options}
				isOpen={isOpen}
				onClick={onClick}
				close={close}
				setResetHighlightIndex={setResetHighlightIndex}
			/>

			<GsuMobileDropDown
                closeOnSelect={closeOnSelect}
				setSearchValue={setSearchValue}
				searchValue={searchValue}
                values={values}
				listName={listName}
				onOptionSelect={onClick}
				closeMobileAutocomplete={close}
				openMobileAutocomplete={isOpen}
				options={options}/>

		</>
	)

}


export default GsuDropDown;