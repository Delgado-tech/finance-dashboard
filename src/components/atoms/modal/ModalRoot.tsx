"use client";

import { useModalContext } from "@/context/ModalContext";
import { RecentrilizeProvider } from "@/context/RecentrilizeContext";
import { useEffect, useRef } from "react";

interface Props {
	outsideClick?: boolean;
	children: React.ReactNode;
	id: string;
}

export default function ModalRoot({
	children,
	id,
	outsideClick = true,
}: Props) {
	const modalOutsideRef = useRef<HTMLDivElement>(null);
	const modalContext = useModalContext();

	useEffect(() => {
		const modalOutside = modalOutsideRef.current;

		const outsideClickHandler = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (target.id === id) {
				modalContext.closeId(id);
			}
		};

		if (modalOutside && outsideClick) {
			modalOutside.addEventListener("click", outsideClickHandler);
		}

		return () => {
			if (modalOutside) {
				modalOutside.removeEventListener("click", outsideClickHandler);
			}
		};
	}, []);

	return (
		<RecentrilizeProvider sectionId={id}>
			<div
				ref={modalOutsideRef}
				id={id}
				className="fixed z-[9999] flex h-screen w-full items-center justify-center overflow-auto bg-zinc-950 bg-opacity-70"
			>
				{children}
			</div>
		</RecentrilizeProvider>
	);
}
