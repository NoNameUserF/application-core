import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";
import {IRoute} from "../../types/globalTypes";
import {FC} from "react";

interface NavBarProps {
	router: IRoute[];
	appName: string;
	collapsedMobileNavbar: boolean;
	setCollapsedMobileNavbar: (collapsedMobileNavbar: boolean) => void;
}

export const NavBar:FC<NavBarProps> = ({ router, appName, collapsedMobileNavbar, setCollapsedMobileNavbar }) => {
	return (
		<>
			<DesktopNavBar key={"desktop"} router={router} appName={appName} />

			<MobileNavBar
				key={"mobile"}
				collapsedMobileNavbar={collapsedMobileNavbar}
				setCollapsedMobileNavbar={setCollapsedMobileNavbar}
				router={router}
			/>
		</>
	);
};

export default NavBar;
