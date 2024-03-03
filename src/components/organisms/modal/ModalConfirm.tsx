import Button from "@/components/atoms/button";
import Modal from "@/components/atoms/modal";
import { useModalContext } from "@/context/ModalContext";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
	id: string;
	modalTitle: React.ReactNode;
	danger?: boolean;
	onConfirm: () => void;
}

export default function ModalConfirm({
	id,
	className,
	modalTitle,
	danger = false,
	onConfirm,
}: Props) {
	const modalContext = useModalContext();

	return (
		<Modal.Root id={id}>
			<Modal.Container
				className={twMerge(
					"min-h-fit w-[clamp(200px,_100%,_600px)] py-6",
					className,
				)}
			>
				<h2 className="pb-6 text-lg font-medium">{modalTitle}</h2>
				<div className="group flex gap-2 pl-20" data-danger={danger}>
					<Button.Root
						className="border border-teal-600 group-data-[danger=true]:border-red-400"
						onClick={() => onConfirm()}
					>
						<Button.Content className="font-bold text-teal-600 group-data-[danger=true]:text-red-400">
							Sim
						</Button.Content>
					</Button.Root>
					<Button.Root
						className="bg-teal-600 hover:bg-teal-500 group-data-[danger=true]:bg-red-400 group-data-[danger=true]:hover:bg-red-300"
						onClick={() => modalContext.closeId(id)}
					>
						<Button.Content className="font-bold text-white">Não</Button.Content>
					</Button.Root>
				</div>
			</Modal.Container>
		</Modal.Root>
	);
}
