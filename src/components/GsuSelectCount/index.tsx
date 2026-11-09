import cn from "classnames/dedupe";
import styles from "./index.module.css";
import {WishAddPeopleIconActive, WishAddPeopleIconDisabled, WishRemovePeopleIconActive, WishRemovePeopleIconDisabled} from "../../assets/Icons";
import {FC} from "react";

interface GsuSelectCountProps {
	count: number;
	increaseCount: () => void;
	decreaseCount: () => void;
	maxCount?: number;
	minCount?: number;
}

export const GsuSelectCount:FC<GsuSelectCountProps> = ({ count, increaseCount, decreaseCount, maxCount = 12, minCount = 1 }) => {
	return (
		<div className={styles.countContainer}>
			<div className={styles.countWrapper}>
				<button
					disabled={count <= minCount}
					className={cn(styles.countButton, { [styles.countButton__disabled]: count <= minCount })}
					onClick={decreaseCount}>
					{count <= minCount ? 
            (<WishRemovePeopleIconDisabled />) : 
            (<WishRemovePeopleIconActive />)
          }
				</button>

				<p className={styles.countValue}>{count}</p>

				<button
					disabled={count >= maxCount}
					onClick={increaseCount}
					className={cn(styles.countButton, {
						[styles.countButton__disabled]: count >= maxCount,
					})}>
					{count >= maxCount ? 
            (<WishAddPeopleIconDisabled />) : 
            (<WishAddPeopleIconActive />)
          }
				</button>
			</div>
		</div>
	);
};
