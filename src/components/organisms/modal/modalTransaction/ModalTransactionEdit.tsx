"use client";

import Button from "@/components/atoms/button";
import Modal from "@/components/atoms/modal";
import { useModalContext } from "@/context/ModalContext";
import { IMockTransactions, transactions } from "@/mock/transactions.mockup";
import { ComponentProps, useState } from "react";
import ModalConfirm from "../ModalConfirm";
import ModalTransactionForm from "./ModalTransactionForm";

interface Props extends ComponentProps<"div"> {
	id: string;
	sourceId?: string;
}

export default function ModalTransactionEdit({
	id,
	sourceId,
	className,
}: Props) {
	const data: IMockTransactions = transactions.filter(
		(value) => String(value.id) === sourceId,
	)[0];

	const modalContext = useModalContext();
	const [editMode, setEditMode] = useState<boolean>(false);

	return (
		<Modal.Root id={id}>
			<Modal.Container className={className}>
				<Modal.CloseX id={id} />

				<ModalTransactionForm data={data} disabled={!editMode} />

				<div className="group flex gap-2 pb-2 pl-20 pt-8" data-edit={editMode}>
					<Button.Root
						className="w-full"
						onClick={() => {
							if (editMode) {
								setEditMode(false);
								return;
							}

							modalContext.closeId(id);
						}}
					>
						<Button.Content text={editMode ? "Cancelar" : "Fechar"} />
					</Button.Root>
					<Button.Root
						className="w-full bg-red-400 hover:bg-red-300 group-data-[edit=true]:hidden"
						onClick={() => {
							modalContext.open(
								<ModalConfirm
									id={"m-delete"}
									modalTitle={
										<>
											Você tem certeza que deseja <b>deletar permanente</b> esse registro?
										</>
									}
									onConfirm={() => {
										//TODO deletar na API
										modalContext.closeId("m-delete");
										modalContext.closeId(id);
									}}
									danger
								/>,
							);
						}}
					>
						<Button.Content text="Deletar" className="font-medium text-white" />
					</Button.Root>
					<Button.Root
						className="w-full bg-amber-500 hover:bg-amber-400 
							group-data-[edit=true]:bg-emerald-500 group-data-[edit=true]:hover:bg-emerald-400"
						onClick={() => {
							if (editMode) {
								modalContext.open(
									<ModalConfirm
										id={"m-confirm"}
										modalTitle={
											"Você tem certeza que deseja salvar as alterações feitas?"
										}
										onConfirm={() => {
											setEditMode(false);
											//TODO atualizar na API
											modalContext.closeId("m-confirm");
										}}
									/>,
								);
								return;
							}

							setEditMode(true);
						}}
					>
						<Button.Content
							text={editMode ? "Salvar" : "Editar"}
							className="font-medium text-white"
						/>
					</Button.Root>
				</div>
			</Modal.Container>
		</Modal.Root>
	);
}
