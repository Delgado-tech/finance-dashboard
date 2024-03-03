export interface IMockTransactions {
	id?: string;
	category?: string;
	categoryIcon?: string;
	item?: string;
	service?: string;
	date?: Date;
	method?: string;
	price?: string;
	type?: "expenses" | "revenue";
	description?: string;
}

export const transactions: IMockTransactions[] = [
	{
		id: "1",
		category: "Casa",
		categoryIcon: "Home",
		item: "Sushi",
		service: "Naomi",
		date: new Date("2024-01-31"),
		method: "Cartão de crédito",
		price: "5000",
		type: "expenses",
	},
	{
		id: "2",
		category: "Comida",
		categoryIcon: "Pizza",
		item: "Pagamento",
		service: "Pizza Hut",
		date: new Date("2024-01-01"),
		method: "Cartão de crédito",
		price: "30000",
		type: "revenue",
	},
	{
		id: "3",
		category: "Casa",
		categoryIcon: "Home",
		item: "Taco de baseball",
		service: "Dacathlon",
		date: new Date("2023-12-22"),
		method: "PIX",
		price: "30000",
		type: "expenses",
	},
	{
		id: "4",
		category: "Casa",
		categoryIcon: "Home",
		item: "Taco de baseball",
		service: "Dacathlon",
		date: new Date("2023-12-02"),
		method: "PIX",
		price: "30000",
		type: "expenses",
	},
	{
		id: "5",
		category: "Comida",
		categoryIcon: "Pizza",
		item: "Taco de baseball",
		service: "Dacathlon",
		date: new Date("2023-05-02"),
		method: "PIX",
		price: "30000",
		type: "expenses",
	},
	{
		id: "6",
		category: "Restaurante",
		categoryIcon: "Utensils",
		item: "Taco de baseball",
		service: "Dacathlon",
		date: new Date("2023-02-02"),
		method: "PIX",
		price: "30000",
		type: "expenses",
	},
	{
		id: "7",
		category: "Casa",
		categoryIcon: "Home",
		item: "Taco de baseball",
		service: "Dacathlon",
		date: new Date("2022-10-02"),
		method: "PIX",
		price: "30000",
		type: "expenses",
	},
	{
		id: "8",
		category: "Comida",
		categoryIcon: "Pizza",
		item: "Taco de baseball",
		service: "Dacathlon",
		date: new Date("2022-10-02"),
		method: "PIX",
		price: "30000",
		type: "expenses",
	},
	{
		id: "9",
		category: "Comida",
		categoryIcon: "Pizza",
		item: "Taco de baseball",
		service: "Dacathlon",
		date: new Date("2022-10-02"),
		method: "PIX",
		price: "30000",
		type: "expenses",
	},
	{
		id: "10",
		category: "Comida",
		categoryIcon: "Pizza",
		item: "Taco de baseball",
		service: "Dacathlon",
		date: new Date("2022-10-02"),
		method: "PIX",
		price: "30000",
		type: "expenses",
	},
	{
		id: "11",
		category: "Comida",
		categoryIcon: "Pizza",
		item: "Taco de baseball 2",
		service: "Dacathlon",
		date: new Date("2022-10-02"),
		method: "PIX",
		price: "30000",
		type: "expenses",
	},
	{
		id: "12",
		category: "Comida",
		categoryIcon: "Pizza",
		item: "Taco de baseball",
		service: "Dacathlon",
		date: new Date("2024-09-02"),
		method: "PIX",
		price: "50000",
		type: "expenses",
	},
	{
		id: "13",
		category: "Comida",
		categoryIcon: "Pizza",
		item: "Taco de baseball",
		service: "Dacathlon",
		date: new Date("2024-10-02"),
		method: "PIX",
		price: "30000",
		type: "expenses",
	},
	{
		id: "14",
		category: "Comida",
		categoryIcon: "Pizza",
		item: "Taco de baseball 2",
		service: "Dacathlon",
		date: new Date("2023-09-02"),
		method: "PIX",
		price: "30000",
		type: "expenses",
	},
];
