"use client";

import Button from "@/components/atoms/button";
import Modal from "@/components/atoms/modal";
import { useModalContext } from "@/context/ModalContext";
import { ComponentProps } from "react";
import ModalTransactionForm from "./ModalTransactionForm";

interface Props extends ComponentProps<"div"> {
	id: string;
	sourceId?: string;
}

export default function ModalTransactionRegister({ id, className }: Props) {
	const modalContext = useModalContext();

	return (
		<Modal.Root id={id}>
			<Modal.Container className={className}>
				<Modal.CloseX id={id} />

				<ModalTransactionForm data={{}} />

				<div className="flex gap-2 pb-2 pl-20 pt-8">
					<Button.Root
						className="w-full"
						onClick={() => {
							modalContext.closeId(id);
						}}
					>
						<Button.Content text={"Fechar"} />
					</Button.Root>
					<Button.Root
						className="w-full bg-emerald-500 hover:bg-emerald-400"
						onClick={() => {
							//TODO: salvar dados na api
							modalContext.closeId(id);
						}}
					>
						<Button.Content text={"Cadastrar"} className="font-medium text-white" />
					</Button.Root>
				</div>
			</Modal.Container>
		</Modal.Root>
	);
}
