import {ReactElement} from 'react'
import styles from "./index.module.css";
import cn from "classnames/dedupe";

interface IGsuCardList<T extends object = {}> {
    cards: T[];
    selectedCard: T | null;
    onSelectCard: (card: T) => void;
    uid: keyof T;
    CardComponent: (card: T) => ReactElement<T>;
}

const GsuCardList = <T extends object>({
                                            cards,
                                            selectedCard,
                                            onSelectCard,
                                            uid,
                                            CardComponent,
                                        }: IGsuCardList<T>) => {


    const isCardSelected = (card: T) => {
        if (!selectedCard) {
            return false;
        }
        return selectedCard[uid] === card[uid];
    };

    return (
        <ul className={styles.listBlock}>
            {cards.map((card, index) => {
                const Component = CardComponent(card);
                return <div
                    key={index}
                    className={cn(styles.cardContainer, {[styles.selectedCard]: isCardSelected(card)})}
                    onClick={() => onSelectCard(card)}
                >
                    {Component}
                </div>
            })}
        </ul>
    );
};

export default GsuCardList;
