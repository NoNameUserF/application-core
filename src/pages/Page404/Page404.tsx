import { useNavigate } from "react-router-dom";

import GsuButton from "../../components/GsuButton";

import styles from "./index.module.css";
import {FC} from "react";

interface Page404Props {
	image: string;
}

const Page404:FC<Page404Props> = ({ image }) => {
	const navigate = useNavigate();
	const handleClick = () => navigate("/");
	return (
		<div className={styles["page404"]}>
			<div className={styles["imageBlock"]}>
				<img src={image} alt={"Страница не найдена"} />
			</div>
			<h1 className={styles["page404_title"]}>Страница не найдена</h1>
			<h2 className={styles["page404_subtitle"]}>Мы работаем над проблемой</h2>
			<GsuButton text={"НА ГЛАВНУЮ"} style={"primary"} onClick={handleClick} />
		</div>
	);
};

export default Page404;
