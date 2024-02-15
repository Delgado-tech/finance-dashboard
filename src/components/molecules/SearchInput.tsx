"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import InputFieldIcon from "./InputFieldIcon";

interface Props extends ComponentProps<"input"> {}

export default function SearchInput({
	id = "search",
	className,
	placeholder = "Busque aqui",
}: Props) {
	const [input, setInput] = useState<string>("");
	const divRef = useRef<HTMLDivElement>(null);

	const searchParams = new URLSearchParams(useSearchParams());
	searchParams.delete("q");

	useEffect(() => {
		const div = divRef.current;

		if (input !== "") {
			if (div) {
				div.querySelector("a")?.click();
			}
		}
	}, [input]);

	const href = `?${[`q=${input.trim()}`, searchParams.toString()]
		.filter((v) => v.replace("q=", "") !== "")
		.join("&")}`;

	const setInputHandler = () => {
		const div = divRef.current;

		if (div) {
			const search = div.querySelector("input");
			setInput(search?.value.trim() || " ");
		}
	};

	return (
		<div ref={divRef}>
			<Link href={href} className="hidden" />
			<InputFieldIcon
				id={id}
				className={twMerge(
					"border-none bg-white placeholder:text-zinc-500",
					className,
				)}
				placeholder={placeholder}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						setInputHandler();
					}
				}}
				iconAction={() => setInputHandler()}
				defaultValue={input || ""}
				icon={<Search />}
			/>
		</div>
	);
}
