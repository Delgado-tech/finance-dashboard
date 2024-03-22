import DynamicIcon from "@/components/atoms/DynamicIcon";
import { IMockTransactions } from "@/mock/transactions.mockup";
import { IRows } from "@/types/table";
import dFormat from "dateformat";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

interface ITransactionTableFormatedData {
	header: React.ReactNode[];
	rows: IRows[];
}

export function getTransactionTableFormatedData(
	data: IMockTransactions[],
	showIcons: boolean = true,
): ITransactionTableFormatedData {
	const header = ["Itens", "Descrição", "Data", "Método de Pagamento", "Valor"];

	const rows: IRows[] = data.map((item, index) => {
		const columns: any = [
			<span key={index} className="flex items-center justify-start gap-2">
				{showIcons && <DynamicIcon iconName={item.categoryIcon} />}
				{item.item}
			</span>,
			<>{item.service}</>,
			<>{dFormat(item.date, "mmm dd, yyyy")}</>,
			<>{item.method}</>,
			<span
				key={index}
				data-type={item.type}
				className="flex justify-end data-[type=revenue]:text-emerald-500"
			>
				{showIcons && (
					<>
						{item.type === "revenue" ? (
							<ArrowBigUp />
						) : (
							<ArrowBigDown className="text-zinc-400" />
						)}
					</>
				)}

				{(Number(item.price) / 100).toLocaleString("pt-BR", {
					style: "currency",
					currency: "BRL",
				})}
			</span>,
		];
		return { id: String(item.id), columns: columns };
	});

	return { header, rows };
}
