"use client";

import DynamicIcon from "@/components/atoms/DynamicIcon";
import InputField from "@/components/molecules/InputField";
import SelectSearchInput from "@/components/molecules/SelectSearchInput";
import SwitchTextInput from "@/components/molecules/SwitchTextInput";
import TextareaField from "@/components/molecules/TextareaField";
import { IMockTransactions } from "@/mock/transactions.mockup";
import { RegexTemplate } from "@/utils/regex";
import dFormat from "dateformat";
import { AlignCenter } from "lucide-react";
import { ComponentProps, useState } from "react";

interface Props extends ComponentProps<"div"> {
	data: IMockTransactions;
	disabled?: boolean;
}

export default function ModalTransactionForm({
	data,
	disabled = false,
}: Props) {
	const [icon, setIcon] = useState<React.ReactNode>(
		<DynamicIcon iconName={data.categoryIcon} />,
	);

	const [currentType, setCurrentType] = useState<string | undefined>(data.type);

	//#region mockup
	const categoryList = [
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

	const options = categoryList.map((value) => value.category);
	//#endregion

	return (
		<form className="flex flex-col gap-6">
			<div className="flex gap-2">
				<figure
					data-type={currentType}
					className="flex h-fit rounded-full border border-zinc-400 bg-red-400 p-6 text-white shadow-sm transition-all data-[type='revenue']:bg-emerald-600"
				>
					<span className="size-6">{icon}</span>
				</figure>
				<div className="flex w-[90%] max-w-[250px] flex-col gap-2">
					<InputField
						id={"item"}
						label="Nome"
						labelColor="bg-white"
						defaultValue={data.item}
						disabled={disabled}
					/>
					<SelectSearchInput
						id={"category"}
						actionInputValue={(inputValue) => {
							const option = categoryList.find(
								(value) => value.category === inputValue,
							);
							const optionIcon = option ? (
								<DynamicIcon iconName={option.icon} />
							) : (
								<AlignCenter />
							);

							setIcon(optionIcon);
						}}
						defaultValue={data.category}
						options={options}
						placeholder={"Categoria"}
						disabled={disabled}
						required
					/>
				</div>
				<InputField
					id={"date"}
					label="Data"
					defaultValue={dFormat(data.date, "dd/mm/yyyy")}
					minLength={10}
					required={true}
					labelColor="bg-white"
					disabled={disabled}
					regexFC={RegexTemplate.Date}
				/>
			</div>
			<InputField
				id={"service"}
				label="Nome do serviço"
				defaultValue={data.service}
				disabled={disabled}
				labelColor="bg-white"
			/>
			<TextareaField
				id={"description"}
				label={"Descrição"}
				defaultValue={data.description?.replace("---", "")}
				labelColor="bg-white"
				disabled={disabled}
				maxLength={256}
			/>
			<div className="grid grid-cols-2 gap-2">
				<div className="flex flex-col gap-2">
					<SelectSearchInput
						id={"method"}
						options={optionsMethod}
						label={"Método de pagamento"}
						defaultValue={data.method}
						labelColor="bg-white"
						disabled={disabled}
						required
					/>
					<SwitchTextInput
						id={"type"}
						options={optionsType}
						onSwitch={(opiton) => {
							setCurrentType(opiton);
						}}
						disabled={disabled}
						defaultValue={data.type}
					/>
				</div>
				<InputField
					id={"price"}
					label={"Valor"}
					labelColor="bg-white"
					defaultValue={`R$ ${Math.max(Number(data.price || 0) / 100, 0).toFixed(2)}`}
					disabled={disabled}
					regexFC={RegexTemplate.MoneyBrl}
				/>
			</div>
		</form>
	);
}
