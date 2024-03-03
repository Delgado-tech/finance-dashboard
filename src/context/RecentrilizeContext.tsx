"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface IRecentrilizeContext {
	ids: string[];
	setId: () => void;
}

const RecentrilizeContext = createContext<IRecentrilizeContext | undefined>(
	undefined,
);

interface Props {
	sectionId: string;
	children: React.ReactNode;
}

export function RecentrilizeProvider({ children, sectionId }: Props) {
	const [divsToRecentrilize, setDivsToRecentrilize] = useState<string[]>([]);

	function setId() {
		setDivsToRecentrilize((prev) => [
			...prev.filter((id) => id !== sectionId),
			sectionId!,
		]);
	}

	useEffect(() => {
		setId();
	}, []);

	useEffect(() => {
		const resizeHandler = () => {
			divsToRecentrilize.forEach((id) => {
				const target = document.getElementById(id)!;
				if (target.clientHeight - target.scrollHeight < 0) {
					target.classList.replace("items-center", "items-start");
				} else {
					target.classList.replace("items-start", "items-center");
				}
			});
		};

		resizeHandler();

		window.addEventListener("resize", resizeHandler);

		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, [divsToRecentrilize]);

	const contextValue: IRecentrilizeContext = {
		ids: divsToRecentrilize,
		setId,
	};

	return (
		<RecentrilizeContext.Provider value={contextValue}>
			{children}
		</RecentrilizeContext.Provider>
	);
}

export function useRecentrilize(): IRecentrilizeContext {
	const context = useContext(RecentrilizeContext);
	if (!context) {
		throw new Error(
			"useRecentrilize deve ser usado dentro de um RecentrilizeProvider",
		);
	}

	return context;
}
