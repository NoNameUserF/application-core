import { Component, ReactNode, ErrorInfo } from "react";

import GsuButton from "../GsuButton";

import { STAGE } from "../../envs/env";

import styles from "./index.module.css";

interface ErrorBoundaryState {
	error: Error | null;
}

interface ErrorBoundaryProps {
	img500src: string;
	children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			error: null,
		};
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		if (STAGE && (STAGE === "QA" || STAGE === "PRODUCTION")) {
			window.localStorage.clear();
			return { error };
		}
		return { error: null };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("Error caught by ErrorBoundary:", error, errorInfo);
	}

	handleGoHome = () => {
		window.location.replace(window.location.origin);
	};

	render() {
		const { error } = this.state;
		const { img500src } = this.props;


		if (error !== null) {
			return (
				<div className={styles.errorBoundaryContainer}>
					{img500src && <div className={styles.imageBlock}><img src={img500src} alt="Error 500" /></div>}
					<h1 className={styles.errorBoundaryTitle}>Упппс...</h1>
					<h2 className={styles.errorBoundaryText}>Произошла ошибка! Мы работаем над проблемой</h2>
					<GsuButton style={"primary"} text={"НА ГЛАВНУЮ"} onClick={this.handleGoHome} />
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;