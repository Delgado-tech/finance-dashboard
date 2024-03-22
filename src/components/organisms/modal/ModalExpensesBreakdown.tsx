import DynamicIcon from "@/components/atoms/DynamicIcon";
import Modal from "@/components/atoms/modal";
import { DateViewMode } from "@/context/DateContext";
import { getMonthName } from "@/utils/getMonthNames";
import { getTransactionTableFormatedData } from "@/utils/transactionTableData";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { ICategoryList } from "../ExpensesBreakdown";
import Table from "../Table";

interface Props extends ComponentProps<"div"> {
	id: string;
	categoryList: ICategoryList;
	dateViewMode: DateViewMode;
	month: number;
	year: number;
}

export default function ModalExpensesBreakdown({
	id,
	categoryList,
	className,
	dateViewMode,
	year,
	month,
}: Props) {
	const { header, rows } = getTransactionTableFormatedData(
		categoryList.itens,
		false,
	);

	return (
		<Modal.Root id={id}>
			<Modal.Container
				className={twMerge(
					"min-h-fit w-[clamp(200px,_100%,_1200px)] py-6",
					className,
				)}
			>
				<Modal.CloseX id={id} />
				<div className="pb-6 text-lg font-medium">
					<h2 className="flex select-none justify-between gap-8 px-6 pb-6 text-2xl font-medium text-teal-600">
						<span className="flex items-center gap-2">
							<DynamicIcon iconName={categoryList.icon} />
							{categoryList.name}
						</span>
						<span className="text-lg text-zinc-600">
							{dateViewMode === "month-week" &&
								getMonthName(month, { format: "long" })}{" "}
							{year}
						</span>
					</h2>
					<Table header={header} rows={rows} />
				</div>
			</Modal.Container>
		</Modal.Root>
	);
}
