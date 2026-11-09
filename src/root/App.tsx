import { useEffect } from "react";
import { setMainHost, setStage } from "../envs/env";

import GSUApp from "./GSUApp";
import router from "../routes/routes";

import image404 from "/tmp/ErrorContent/image-404.png";
import image500 from "/tmp/ErrorContent/error500.png";
import cookingLogo from "/tmp/Logo/cookingLogo.svg";
import alivioLogo from "/tmp/Logo/alivioLogo.svg";
import cookingLogoMobile from "/tmp/Logo/logoCookingWithNameMobile.svg";

const App = () => {
	useEffect(() => {
		setMainHost(import.meta.env.VITE_MAIN_API_URL);
		setStage(import.meta.env.VITE_MAIN_STAGE);
	}, []);

	return (
		<GSUApp
			feedbackImg={'/tmp/Feedback/modalFeedback.png'}
			mainLogo={alivioLogo}
			logoSrc={cookingLogo}
			logoSrcMobile={cookingLogoMobile}
			appName={"gsu-ai-core"}
			router={router}
			img404src={image404}
			img500src={image500}></GSUApp>
	);
};
export default App;
