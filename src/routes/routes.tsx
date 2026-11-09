import { HeatIcon } from "../assets/CustomizeSvg/NavBar/HeatIcon";
import { FoodIcon } from "../assets/CustomizeSvg/NavBar/FoodIcon";
import { DrinkIcon } from "../assets/CustomizeSvg/NavBar/DrinkIcon";
import { HomeIcon } from "../assets/CustomizeSvg/NavBar/HomeIcon";
import { CartIcon } from "../assets/CustomizeSvg/NavBar/CartIcon";
import {IRoute} from "../types/globalTypes";
import TestPage1 from "../pages/testPage1";
import BooksPage from "../pages/BooksPage";
import CountriesPage from "../pages/CountriesPage";
import CartPage from "../pages/CartPage";

const router: IRoute[] = [
	{
		path: "/",
		name: "Главная",
		icon: HomeIcon,
		component: TestPage1,
	},
	{
		path: "/dishesByName",
		name: "Блюда по названию",
		icon: HeatIcon,
		component: TestPage1,
	},
	{
		path: "/ingredientDishes",
		name: "Блюда из ингридиентов",
		icon: HeatIcon,
		component: TestPage1,
	},
	{
		path: "/dishesAtWill",
		name: "Блюда по желанию",
		icon: FoodIcon,
		component: TestPage1,
	},
	{
		path: "/cart",
		name: "Корзина покупок",
		icon: CartIcon,
		component: TestPage1,
	},
	{
		path: "/drinks",
		name: "Напитки",
		icon: DrinkIcon,
		component: TestPage1,
	},
	{
		path: "/books",
		name: "Книги",
		component: BooksPage,
		icon: DrinkIcon,
	},
	{
		path: "/countries",
		name: "Страны",
		component: CountriesPage,
		icon: DrinkIcon,
	},
	{
		path: "/cart2",
		name: "Корзина",
		component: CartPage,
		icon: DrinkIcon,
	},
];

export default router;
