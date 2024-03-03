import { DateViewMode } from "@/context/DateContext";
import { IMockTransactions } from "@/mock/transactions.mockup";
import { clamp } from "./clamp";

interface ICreateExpensesSeriesByViewMode {
	expenses: IMockTransactions[];
	xAxisCategoryNames: string[];
	viewMode: DateViewMode;
	year: number;
	month: number;
}

export function createExpensesSeriesByViewMode({
	expenses,
	xAxisCategoryNames,
	viewMode,
	year,
	month,
}: ICreateExpensesSeriesByViewMode): number[][] {
	// Recebe dois arrays de números, ambos valores array recebem 12 números se o viewMode for de meses
	// ou 4 números se o viewMode for de semanas, o array "0" recebe os valores do ano/mês anterior
	// e o array 1 recebe os valores do ano/mês atual
	const series: number[][] = [[], []];

	// Como o array de despesas (`expenses`) está ordenado por data,
	// podemos usar esse índice para rastrear a posição dos valores
	// referentes ao próximo mês/semana. Quando o mês/semana da despesa atual é
	// maior que o mês/semana do loop externo, atualizamos
	// `lastProcessedExpenseIndex` para o índice atual.
	// Isso marca o início da sequência de valores do próximo mês/semana.
	let lastProcessedIndex = 0;

	const pushSeries = (values: number[]) => {
		series.forEach((serie, index) => {
			serie.push(values[index]);
		});
	};

	for (
		let categoryIndex = 0;
		categoryIndex < xAxisCategoryNames.length;
		categoryIndex++
	) {
		let categoryValuesAccumulator: number[] = [0, 0];

		for (let i = lastProcessedIndex; i < expenses.length; i++) {
			const item = expenses[i];
			const itemYear = item.date?.getFullYear() ?? new Date().getFullYear();
			const itemMonth = item.date?.getMonth() ?? 0;
			const itemDay = item.date?.getDate() ?? 0;

			const itemSeries = viewMode === "year-month" ? itemYear : itemMonth;
			const targetSeries = viewMode === "year-month" ? year : month;

			const itemIndex =
				viewMode === "year-month"
					? itemMonth
					: clamp(Math.floor(itemDay / 7), 0, 3);

			const isLastIndex = i === expenses.length - 1;

			// Caso o mês/semana do loop seja menor que o mês/semana do item, isso significa
			// que não há nenhum valor á mais a ser adicionado para aquele mês/semana
			if (categoryIndex < itemIndex) {
				lastProcessedIndex = i;
				pushSeries(categoryValuesAccumulator);
				break;
			}

			// Caso o mês/semana do loop seja maior que o mês/semana do item, isso significa
			// que o item atual não pode ser adicionado a esse mês/semana, seguindo para
			// o próximo item, no entando se esse for o último item é adicionado
			// o valor 0 para esse mês/semana
			if (categoryIndex > itemIndex) {
				if (isLastIndex) {
					pushSeries(categoryValuesAccumulator);
				}
				continue;
			}

			// Incrementa o acumulador de valor do mês/semana com o preço do item atual
			// o valor dele é divido por 100 devido a regra de negócio que estabele
			// que não deve ser armazenado valores decimais no banco de dados
			// então 10.50 virá 1050, então a divisão é feita para capturar o valor
			// decimal no frontend da aplicação.
			const mvaIndex = itemSeries === targetSeries ? 1 : 0;

			categoryValuesAccumulator[mvaIndex] += Number(item.price) / 100;
			if (isLastIndex) {
				pushSeries(categoryValuesAccumulator);
			}
		}
	}

	return series;
}
