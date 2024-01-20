"use server";

import axios from "axios";
import { cookies } from "next/headers";

interface IGetAuthorization {
	success: boolean;
	data?: {
		id: number;
		name: string;
		ac: number;
	};
}

export default async function getAuthorization(): Promise<IGetAuthorization> {
	const { data } = await axios.get("http://localhost:3000/api/auth", {
		headers: {
			token: cookies().get("token")?.value,
		},
	});

	return data;
}
