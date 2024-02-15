"use client";

import {
	ArrowRightLeft,
	Crosshair,
	Grid2X2,
	LogOut,
	Receipt,
	Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import TextLogo from "../atoms/TextLogo";
import Button from "../atoms/button";
import SidebarLink, {
	Props as ISidebarLinkProps,
} from "../molecules/SidebarItem";
import SidebarProfile from "../molecules/SidebarProfile";

interface Props {}

export default function Sidebar({}: Props) {
	const [shrinkMode, setShirinkMode] = useState<boolean>(true);
	const pathname = usePathname();

	useEffect(() => {
		const resizeHandler = () => {
			const target = window.innerWidth;
			if (target < 1000) {
				setShirinkMode(true);
			} else {
				setShirinkMode(false);
			}
		};

		resizeHandler();

		window.addEventListener("resize", resizeHandler);

		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, []);

	const sidebarLinks: ISidebarLinkProps[] = [
		{ text: "Visão geral", link: "/dashboard/overview", icon: <Grid2X2 /> },
		{
			text: "Transações",
			link: "/dashboard/transactions",
			icon: <ArrowRightLeft />,
		},
		{ text: "Despesas", link: "/dashboard/expenses", icon: <Receipt /> },
		{ text: "Metas", link: "/dashboard/goals", icon: <Crosshair /> },
		{ text: "Configurações", link: "/dashboard/settings", icon: <Settings /> },
	];

	return (
		<section
			data-shrink={shrinkMode}
			className="dark-overflow-auto sticky top-0 m-0 h-screen bg-zinc-800 px-7 py-12 text-zinc-50 data-[shrink=false]:w-80"
		>
			<nav className="flex h-full flex-col justify-between gap-10">
				<section className="flex flex-col gap-10">
					{/* Logo */}
					<div className="cursor-pointer self-center">
						{shrinkMode ? (
							<h1 className="text-center font-poppins text-3xl" title="finebank.io">
								<span className="font-extrabold">F</span>b
							</h1>
						) : (
							<TextLogo className="text-3xl text-white" noPreResponsivity />
						)}
					</div>

					{/* Páginas */}
					<div className="flex flex-col gap-4">
						{sidebarLinks.map((props, index) => {
							return (
								<span key={index} data-shrink={shrinkMode} className="group">
									<SidebarLink
										icon={props.icon}
										text={shrinkMode ? "" : props.text}
										link={props.link}
										selected={pathname === props.link}
										className="group-data-[shrink=true]:w-full group-data-[shrink=true]:justify-center group-data-[shrink=true]:gap-0"
									/>
								</span>
							);
						})}
					</div>
				</section>

				{/* Parte inferior */}
				<section className="flex flex-col gap-12">
					{/* Logout */}
					<span data-shrink={shrinkMode} className="group">
						<Button.Root
							link={"/login"}
							className="justify-start bg-zinc-700 px-4 hover:bg-zinc-600 group-data-[shrink=true]:justify-center group-data-[shrink=true]:gap-0"
						>
							<Button.Icon icon={<LogOut />} className="text-zinc-50" />
							<Button.Content
								text={shrinkMode ? "" : "Sair"}
								className="text-zinc-50"
							/>
						</Button.Root>
					</span>

					{/* Perfil */}
					<SidebarProfile
						username={"Leonardo Felipe Camilo Delgado"}
						hideText={shrinkMode}
					/>
				</section>
			</nav>
		</section>
	);
}
