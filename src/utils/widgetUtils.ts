export const scrollWidgetToTop = () => {
	const element = document.getElementById("gsu-widget");
	if (element) {
		element.scrollTop = 0;
	}
}

export const lockWidgetScroll = () => {
	const element = document.getElementById("gsu-widget");
	if (element) {
		element.setAttribute("style", "overflow-y: hidden; overscroll-behavior: none;");
	}
}

export const unlockWidgetScroll = () => {
	const element = document.getElementById("gsu-widget");
	if (element) {
		element.setAttribute("style", "");
	}
}

// export const scrollWizardContainerToTop = () => {
// 	const element = document.getElementById("wizard-container");
// 	if (element) {
// 		element.scrollTop = 0;
// 	}
// };
