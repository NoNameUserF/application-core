import {FC} from "react";
import {IOptions} from "../../../types/globalTypes";
import GsuMultiAutocomplete from "../GsuMultiAutocomplete";

interface GsuMultiSelectProps {
    options: IOptions;
    change: (keys: string[]) => void;
    values: string[];
    listName : string,
    hasDefaultValue?: boolean,
    minValuesLength?: number,
    onAddMessage?: (label: string) => string;
    onRemoveMessage?: (label: string) => string;
}


const GsuMultiSelect:FC<GsuMultiSelectProps> = ({options, change, values , listName, hasDefaultValue = true,
                                                    minValuesLength = 1, onAddMessage, onRemoveMessage}) => {
    return (
        <GsuMultiAutocomplete
            hasDefaultValue={hasDefaultValue}
            minValuesLength={minValuesLength}
            values={values}
            listName={listName}
            placeholder={
                values ? Object.entries(options)
                    .filter(([key]) => values.includes(key))
                    .map(([,option]) => option.label)
                    .join(", ") : "Любой"
            }
            onOptionsSelect={change}
            options={options}
            onAddMessage={onAddMessage}
            onRemoveMessage={onRemoveMessage}
        />
    );
};

export default GsuMultiSelect;
