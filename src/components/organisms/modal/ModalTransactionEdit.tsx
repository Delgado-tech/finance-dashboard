"use client";

import DynamicIcon from "@/components/atoms/DynamicIcon";
import Modal from "@/components/atoms/modal";
import InputField from "@/components/molecules/InputField";
import SelectSearchInput from "@/components/molecules/SelectSearchInput";
import SwitchTextInput from "@/components/molecules/SwitchTextInput";
import TextareaField from "@/components/molecules/TextareaField";
import { RegexTemplate } from "@/utils/regex";
import { AlignCenter } from "lucide-react";
import { ComponentProps, useState } from "react";

interface Props extends ComponentProps<"div"> {
	id: string;
}

export default function ModalTransactionEdit({ id, className }: Props) {
	/**
	 * 	{
		category: "Comida",
		categoryIcon: "Pizza",
		item: "Taco de baseball 2",
		desc: "Dacathlon",
		data: new Date("2022-10-02"),
		met: "PIX",
		valor: "30000",
		type: "expenses",
	},
	 */

	//TODO
	//

	const [icon, setIcon] = useState<React.ReactNode>(<AlignCenter />);

	const data = [
		{ category: "Outros", icon: "AlignCenter" },
		{ category: "Comida", icon: "Pizza" },
		{ category: "Comida", icon: "Pizza" },
		{ category: "Comida", icon: "Pizza" },
		{ category: "Comida", icon: "Pizza" },
		{ category: "Comida", icon: "Pizza" },
		{ category: "Comida", icon: "Pizza" },
		{ category: "Comida", icon: "Pizza" },
		{ category: "Comida", icon: "Pizza" },
		{ category: "Comida", icon: "Pizza" },
	];

	const optionsMethod = [
		"Cartão de crédito",
		"Cartão de débito",
		"PIX",
		"Boleto",
	];

	const optionsType = [
		{ display: "Despesa", value: "expenses" },
		{ display: "Receita", value: "revenue" },
	];

	const options = data.map((value) => value.category);

	return (
		<Modal.Root id={id}>
			<Modal.Container className={className}>
				<Modal.CloseX id={id} />
				<form className="flex flex-col gap-6">
					<div className="flex gap-2">
						<figure className="flex h-fit rounded-full border border-zinc-400 bg-teal-500 p-6 text-white shadow-sm">
							<span className="size-6">{icon}</span>
						</figure>
						<div className="flex w-[90%] max-w-[250px] flex-col gap-2">
							<InputField id={"item"} label="Nome" labelColor="bg-white" />
							<SelectSearchInput
								id={"category"}
								actionInputValue={(inputValue) => {
									const option = data.find((value) => value.category === inputValue);
									const optionIcon = option ? (
										<DynamicIcon iconName={option.icon} />
									) : (
										<AlignCenter />
									);

									setIcon(optionIcon);
								}}
								options={options}
								placeholder={"Categoria"}
								required
							/>
						</div>
						<InputField
							id={"date"}
							label="Data"
							minLength={10}
							required={true}
							labelColor="bg-white"
							regexFC={RegexTemplate.Date}
						/>
					</div>
					<InputField id={"service"} label="Nome do serviço" labelColor="bg-white" />
					<TextareaField
						id={"description"}
						label={"Descrição"}
						labelColor="bg-white"
						maxLength={256}
					/>
					<div className="flex gap-2">
						<div className="flex flex-col gap-2">
							<SelectSearchInput
								id={"method"}
								options={optionsMethod}
								label={"Método de pagamento"}
								labelColor="bg-white"
								required
							/>
							<SwitchTextInput id={"type"} options={optionsType} />
						</div>
						<InputField
							id={"price"}
							label={"Valor"}
							labelColor="bg-white"
							defaultValue={"R$ 0"}
							regexFC={RegexTemplate.MoneyBrl}
						/>
					</div>
				</form>
			</Modal.Container>
		</Modal.Root>
	);
}
