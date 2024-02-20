"use client";

import { RegexFunctionType } from "@/utils/regex";
import { Triangle } from "lucide-react";
import { ComponentProps, useEffect, useRef, useState } from "react";
import Input from "../atoms/input";

interface Props extends ComponentProps<"input"> {
	id: string;
	options: string[];
	actionInputValue?: (value: string) => void;
	name?: string;
	label?: string;
	labelColor?: string;
	defaultValue?: string;
	regexFC?: RegexFunctionType;
	invalid?: boolean;
}

export default function SelectSearchInput({
	id,
	options,
	actionInputValue = () => {},
	name,
	type = "text",
	label = id,
	labelColor,
	defaultValue = "",
	regexFC = (value: string) => value,
	minLength,
	placeholder,
	invalid = false,
	required = false,
}: Props) {
	const [input, setInput] = useState<string>(defaultValue);
	const [lastInput, setLastInput] = useState<string>(options[0]);
	const [showDropDown, setShowDropDown] = useState<boolean>(false);
	const divRef = useRef<HTMLDivElement>(null);

	const filtredData = options.filter((value) => value.startsWith(input));

	const setDefaultOption = () => {
		setInput(lastInput);
		actionInputValue(lastInput);
	};

	useEffect(() => {
		const div = divRef.current;

		const focusOutHandler = (event: MouseEvent) => {
			if (!showDropDown) return;

			const target = event.target as HTMLElement;
			if (div) {
				if (!div.contains(target)) {
					const inputElement = div.querySelector("input") as HTMLInputElement;

					if (!options.includes(inputElement.value)) {
						setDefaultOption();
					}

					setShowDropDown(false);
				}
			}
		};

		document.addEventListener("click", focusOutHandler);

		return () => document.removeEventListener("click", focusOutHandler);
	}, [showDropDown]);

	return (
		<Input.Root>
			<div ref={divRef}>
				{!placeholder && (
					<Input.LabelToTop
						ltToggle={input.length > 0}
						label={label}
						htmlFor={id}
						invalid={invalid}
						labelColor={labelColor}
					/>
				)}

				<Input.Body
					id={id}
					name={name}
					type={type}
					className={"pr-8"}
					placeholder={placeholder}
					onChange={(e) => {
						actionInputValue(e.target.value);
						setInput(regexFC(e.target.value));
					}}
					onFocus={() => {
						if (!showDropDown) {
							setInput("");
						}
						setShowDropDown(true);
					}}
					value={input}
					minLength={minLength}
					invalid={invalid}
					required={required}
				/>

				<Input.Icon
					icon={
						<Triangle
							data-show={showDropDown}
							className="size-4 transition-all data-[show=false]:rotate-180"
						/>
					}
					action={() => {
						const div = divRef.current;

						if (div) {
							const input = div.querySelector("input")!;

							if (!showDropDown) {
								input.focus();
								return;
							} else {
								if (!options.includes(input.value)) {
									setDefaultOption();
								}

								setShowDropDown(false);
							}
						}
					}}
				/>

				<div
					data-show={showDropDown}
					className="absolute z-[10] w-full -translate-y-2 rounded-b-lg border border-t-0 border-teal-600 bg-white
					p-2 shadow-sm data-[show=false]:hidden"
				>
					<div className="max-h-[200px] overflow-auto px-2 py-2 last:[&_span]:border-none">
						{filtredData.length > 0 ? (
							filtredData.map((value, index) => (
								<span
									key={index}
									data-value={value}
									className="block w-full cursor-pointer select-none truncate 
								border-b border-zinc-200 p-2 transition-all 
								hover:scale-105 hover:bg-zinc-200"
									onClick={() => {
										setInput(value);
										setLastInput(value);
										actionInputValue(value);
										setShowDropDown(false);
									}}
								>
									{value}
								</span>
							))
						) : (
							<span className="text-sm text-zinc-400">Nenhum valor encontrado!</span>
						)}
					</div>
				</div>
			</div>
		</Input.Root>
	);
}
