import React,{FC} from "react";
import "./index.module.css";
import styles from './index.module.css'

interface IGsuPageDescriptionProps {
	title: string,
	description: string
}

const GsuPageDescription :FC<IGsuPageDescriptionProps> = ({title  , description}) => {
	return (
		<div className={styles.descriptionContainer}>
			<h1 className={styles.title}>{title}</h1>
			<p className={styles.description}>{description}</p>
		</div>
	);
};

export default GsuPageDescription;