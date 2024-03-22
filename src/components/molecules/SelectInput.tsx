"use client";

import { Triangle } from "lucide-react";
import { ComponentProps, useEffect, useRef, useState } from "react";
import Input from "../atoms/input";

interface Props extends ComponentProps<"input"> {
	id: string;
	options: string[];
	actionInputValue?: (value: string, index?: number) => void;
	selectedOptionId?: number;
	name?: string;
	label?: string;
	labelColor?: string;
	defaultOption?: number;
	invalid?: boolean;
}

export default function SelectInput({
	id,
	options,
	actionInputValue = () => {},
	selectedOptionId = 0,
	name,
	label,
	labelColor,
	disabled = false,
	invalid = false,
}: Props) {
	const [input, setInput] = useState<string>("");
	const [showDropDown, setShowDropDown] = useState<boolean>(false);
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const div = divRef.current;

		const focusOutHandler = (event: MouseEvent) => {
			if (!showDropDown) return;

			const target = event.target as HTMLElement;
			if (div) {
				if (!div.contains(target)) {
					setShowDropDown(false);
				}
			}
		};

		document.addEventListener("click", focusOutHandler);

		return () => document.removeEventListener("click", focusOutHandler);
	}, [showDropDown]);

	useEffect(() => {
		setInput(options[selectedOptionId] ?? "");
	}, [selectedOptionId, options]);

	return (
		<Input.Root>
			<div ref={divRef}>
				<div
					onClick={() => {
						setShowDropDown((prev) => !prev);
					}}
				>
					{label && (
						<Input.LabelToTop
							ltToggle={input.length > 0}
							isFocus={showDropDown}
							className="[&>label]:cursor-pointer"
							label={label}
							htmlFor={id}
							invalid={invalid}
							labelColor={labelColor}
						/>
					)}

					<Input.StaticText
						id={id}
						name={name}
						className={"cursor-pointer select-none pr-8"}
						onChange={(e) => {
							setInput(e.target.value);
						}}
						value={input}
						isFocus={showDropDown}
						invalid={invalid}
						disabled={disabled}
					/>

					<Input.Icon
						className={disabled ? "cursor-default" : ""}
						icon={
							<Triangle
								data-show={showDropDown}
								className="size-4 transition-all data-[show=false]:rotate-180 data-[show=true]:text-teal-600"
							/>
						}
						action={() => {
							if (!showDropDown) {
								const input = divRef.current!.querySelector(
									"input",
								) as HTMLInputElement;

								input.focus();
							}
						}}
					/>
				</div>

				<div
					data-show={showDropDown}
					className="absolute z-[10] w-full -translate-y-2 rounded-b-lg border border-t-0 border-teal-600 bg-white
					p-2 shadow-sm data-[show=false]:hidden"
				>
					<div className="max-h-[200px] overflow-auto px-2 py-2 last:[&_span]:border-none">
						{options.length > 0 ? (
							options.map((value, index) => (
								<span
									key={index}
									data-value={value}
									data-selected={input === value}
									className="block w-full cursor-pointer select-none truncate 
										border-b border-zinc-200 p-2 transition-all hover:scale-[101%]
										hover:bg-zinc-200 data-[selected=true]:font-semibold data-[selected=true]:text-teal-600"
									onClick={() => {
										setInput(value);
										actionInputValue(value, index);
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
