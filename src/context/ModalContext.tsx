import { createContext, useContext, useEffect, useState } from "react";

interface IModalContext {
	open: (modal: React.ReactElement) => void;
	closeId: (id: string) => void;
	close: () => void;
	list: React.ReactElement[];
}

interface Props {
	children: React.ReactNode;
}

const ModalContext = createContext<IModalContext | undefined>(undefined);

export function ModalProvider({ children }: Props) {
	const [modalList, setModalList] = useState<React.ReactElement[]>([]);

	useEffect(() => {
		if (modalList.length > 0) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [modalList]);

	const contextValue: IModalContext = {
		open: (modal: React.ReactElement) => {
			setModalList((prevList) => [...prevList, modal]);
		},
		close: () => {
			setModalList((prevList) => {
				prevList.pop();
				return [...prevList];
			});
		},
		closeId: (id: string) => {
			setModalList((prevList) => [
				...prevList.filter((modal) => modal.props.id !== id),
			]);
		},
		list: modalList,
	};

	return (
		<ModalContext.Provider value={contextValue}>
			<>
				{modalList.map((modal, index) => (
					<span key={index}>{modal}</span>
				))}
			</>
			<>{children}</>
		</ModalContext.Provider>
	);
}

export function useModalContext(): IModalContext {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal deve ser usado dentro de um ModalProvider");
	}
	return context;
}
