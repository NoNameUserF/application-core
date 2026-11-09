import React, {FC, useState} from "react";
import GsuSingleAutocomplete from "../components/GsuInputs/GsuSingleAutocomplete";
import {COUNTRIES} from "../constants/countries";
import GsuMultiSelect from "../components/GsuInputs/GsuMultiSelect";
import GsuMultiAutocomplete from "../components/GsuInputs/GsuMultiAutocomplete";
import GsuOptionsNumberInput from "../components/GsuInputs/GsuOptionsNumberInput";
import GsuInput from "../components/GsuInputs/GsuInput";
// import {IGsuIcon} from "../types/globalTypes";
import {CURRENCIES} from "../constants/currencies";
import {GsuInputSearch} from "../components/GsuInputs/GsuInputSearch";
import GsuTextArea from "../components/GsuInputs/GsuTextArea";
import {GsuCardList} from "../index";
import GsuDefaultErrorModal from "../components/GsuModals/GsuDefaultErrorModal";
import GsuButton from "../components/GsuButton";

// export const DishesEmoji: FC<IGsuIcon> =
//     ({className}) => <img className={className} src="/tmp/emoji/dishesEmoji.svg" alt="Dishes Emoji"/>


interface ITimer {
    runningTimer: boolean;
    time: number;
    initTime: number;
    description: string;
    timeLessThanZero: boolean,
}

interface ITimers {
    [key: string]: ITimer;
}

export interface IStep {
    description: string;
    time: number;
    items: string[];
}

const recipeSteps: IStep[] = [
    {
        description: "description",
        time: 15,
        items: ["item1", "item2"]
    }
]

interface ICardI {
    id: string;
    color: string;
}

const cards: ICardI[] = [
    {
        id: "str",
        color: "red",
    },
    {
        id: "str2",
        color: "green",
    },
    {
        id: "str3",
        color: "black",
    }
]

const cardComponent = (card: ICardI) => <div style={{backgroundColor: card.color, width: "100%", height: "100%"}}></div>

const TestPage1: FC = () => {
    const [country, setCountry] = useState<string | null>(null);
    const [countries, setCountries] = useState<string[]>([]);
    const [currency, setCurrency] = useState("USD");
    const [money, setMoney] = useState(100);

    const [card, setCard] = useState<ICardI | null>(null);

    const [value, setValue] = useState("");
    const [error, setError] = useState("")

    const setValue1 = (value: string) => {
        if (value === "error") {
            setError("errrrrrr1")
        } else {
            setError("");
        }

        setValue(value);
    }

    const setMoney1 = (value: number) => {
        if (value === 1000) {
            setError("er1r1r1")
        } else {
            setError("")
        }
        setMoney(value);
    }

    const [modal, setModal] = useState(false);

    return (<div style={{display: "flex", flexDirection: "column", margin: 50, gap: 20}}>
        <GsuButton style={"primary"} onClick={() => setModal(true)} text={"modal"}/>
        <div style={{height: 1000, width: "100%", backgroundColor: "yellow"}}></div>
        <GsuDefaultErrorModal btnLabel={"123"} action={() => setModal(false)} setOpenModal={setModal} openModal={modal}/>
        <GsuCardList cards={cards} selectedCard={card} onSelectCard={setCard} uid={"id"} CardComponent={cardComponent}/>


        <GsuSingleAutocomplete
            value={country}
            listName={"Список стран"}
            placeholder={"Страна"}
            onOptionSelect={setCountry}
            options={COUNTRIES}
        />

        <GsuInput error={error} placeholder={"Выберите что-то"} onChange={setValue1} value={value}/>

        <GsuTextArea error={error} placeholder={"Выберите что-то"} onChange={setValue1} value={value}/>
        <GsuInputSearch value={value} handleChange={setValue} placeholder={"Выберите что-то"}/>


        <GsuMultiSelect
            values={countries}
            listName={"Список стран"}
            change={setCountries}
            options={COUNTRIES}
            minValuesLength={1}
        />

        <div>brbr</div>
        <GsuMultiAutocomplete options={COUNTRIES}
                              minValuesLength={1}
                              onOptionsSelect={setCountries}
                              placeholder={"Страна"}
                              listName={"list"}
                              values={countries}
                              hasDefaultValue={false}
                              onAddMessage={(label) => `продукт "${label}" добавлен в корзину`}
                              onRemoveMessage={(label) => `продукт "${label}" удален из корзины`}
        />

        <GsuOptionsNumberInput error={error}
                               value={money} onChangeValue={setMoney1}
                               optionValue={currency}
                               options={CURRENCIES}
                               onChangeOption={setCurrency}/>







        {/*<div style={{display: "block", margin: 0}}>*/}
        {/*    <GsuButton style={"primary"} onClick={() => {*/}
        {/*    }} text={"Button"}/>*/}
        {/*    <div style={{height: 20}}/>*/}
        {/*    <GsuButton style={"secondary"} onClick={() => {*/}
        {/*    }} text={"Button"}/>*/}
        {/*    <div style={{height: 20}}/>*/}
        {/*    <GsuButton style={"outline"} onClick={() => {*/}
        {/*    }} text={"Button"}/>*/}
        {/*    <div style={{height: 20}}/>*/}
        {/*    <GsuButton Icon={PhotoIcon} style={"destructive"} onClick={() => {*/}
        {/*    }} text={"Button"}/>*/}
        {/*    <div style={{height: 20}}/>*/}
        {/*    /!*<GsuButton style={"text"} onClick={() => {*!/*/}
        {/*    /!*}} text={"Button"}/>*!/*/}

        {/*    <div>------------------------------------------------------------------------------</div>*/}

        {/*    <GsuButton disabled={true} style={"primary"} onClick={() => {*/}
        {/*    }} text={"Button"}/>*/}
        {/*    <div style={{height: 20}}/>*/}
        {/*    <GsuButton disabled={true} style={"secondary"} onClick={() => {*/}
        {/*    }} text={"Button"}/>*/}
        {/*    <div style={{height: 20}}/>*/}
        {/*    <GsuButton disabled={true} style={"outline"} onClick={() => {*/}
        {/*    }} text={"Button"}/>*/}
        {/*    <div style={{height: 20}}/>*/}
        {/*    <GsuButton disabled={true} style={"destructive"} onClick={() => {*/}
        {/*    }} text={"Button"}/>*/}
        {/*    <div style={{height: 20}}/>*/}
        {/*    /!*<GsuButton disabled={true} style={"text"} onClick={() => {*!/*/}
        {/*    /!*}} text={"Button"}/>*!/*/}

        {/*</div>*/}



        {/*<GsuDefaultWizardFinishModal Emoji={DishesEmoji}*/}
        {/*                             header={"Приятного аппетита!"}*/}
        {/*                             msg={"Если наш рецепт пришелся вам по душе, вы можете поддержать наш проект пожертвованием или поделиться своим отзывом, чтобы помочь нам стать еще лучше"}*/}
        {/*                             btnText={"Назад к рецепту"}*/}
        {/*                             componentState={{}}*/}
        {/*                             wizardState={{}}*/}
        {/*                             openModal={true}*/}
        {/*                             setOpenModal={() => {}}*/}
        {/*                             finishWizard={() => {}}/>*/}

        {/*<GsuDefaultErrorModal btnLabel={"Обновить страницу"}*/}
        {/*                      description={"Ваше пожертвование поможет продвинуть этот проект, сделав технологии искусственного интеллекта доступнее, а жизнь проще"}*/}
        {/*                      action={() => {}} setOpenModal={() => {}} openModal={true}/>*/}






        {/*<GsuInputSearch value={"GsuInputSearch"} placeholder={"Найти"} handleChange={() => {}} />*/}


        {/*<button onClick={() => setCountry(null)}>clear</button>*/}
        {/*    <InfoBlockIcon hover={false}></InfoBlockIcon>*/}
        {/*<GsuButtonSingleSelect*/}
        {/*  value={country}*/}
        {/*  options={COUNTRIES}*/}
        {/*  change={setCountry}/>*/}

    </div>)
}

export default TestPage1;