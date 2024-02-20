"use client";

import { ModalProvider } from "@/context/ModalContext";
import DashboardHeader from "../organisms/DashboardHeader";
import Sidebar from "../organisms/Sidebar";

interface Props {
	children: React.ReactNode;
	username: string;
}

export default function AuthLayoutTemplate({ children, username }: Props) {
	return (
		<ModalProvider>
			<div className="flex">
				<Sidebar />
				<div className="w-full">
					<DashboardHeader username={username} />
					{children}
				</div>
			</div>
		</ModalProvider>
	);
}
