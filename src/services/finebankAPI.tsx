import axios from "axios";

//#region models
interface IResponse {
	response?: string;
	token?: string;
	data?: any;
}

interface ILogin {
	email?: string;
	password?: string;
}

interface IRegister {
	name?: string;
	email?: string;
	password?: string;
}

interface IUsers {
	id?: number;
	name?: string;
	email?: string;
	password?: string;
	access_level_id?: number;
	created_at?: string;
	updated_at?: string;
}

interface IGoals {
	id?: number;
	user_id?: number;
	date_value?: string;
	value?: number;
}

interface ITransactions {
	id?: number;
	user_id?: number;
	transaction_type_id?: number;
	categorie_id?: number;
	payment_method_id?: number;
	date_value?: string;
	value?: number;
	description?: string;
}

interface ICategories {
	id?: number;
	name?: string;
	icon_id?: number;
	user_id?: number;
}

interface ICategoriesIcons {
	id?: number;
	icon_name?: string;
}

interface IPaymentMethods {
	id?: number;
	method_name?: string;
}
//#endregion

export namespace FinebankAPI {
	const url = "http://localhost:8080";

	const isErrorString = (str: string | undefined) => {
		if (!str) {
			throw new Error("Ocorreu um erro na requisição, contate um administrador.");
		}

		if (str.startsWith("err:")) {
			throw new Error(str.replace("err:", ""));
		}
	};

	export class Users {
		//----------------------------------------------------------------------------------------------Login
		static async login({ email, password }: ILogin): Promise<void> {
			const { data }: IResponse = await axios
				.post(`${url}/login`, {
					email,
					password,
				})
				.catch((err) => err.response);

			if (!data.token) isErrorString(data.response);

			axios.post(
				"http://localhost:3000/api/auth",
				{},
				{
					headers: {
						token: data.token,
					},
				},
			);
		}
		//----------------------------------------------------------------------------------------------Register
		static async register({ name, email, password }: IRegister): Promise<string> {
			const token: IResponse = await axios.post(`${url}/register`, {
				name,
				email,
				password,
			});
			isErrorString(token.token);

			return token.token!;
		}
	}
}
