"use client";

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
	invalid?: boolean;
}

export default function SelectInput({
	id,
	options,
	actionInputValue = () => {},
	name,
	type = "text",
	label,
	labelColor,
	defaultValue,
	disabled = false,
	minLength,
	invalid = false,
	required = false,
}: Props) {
	const [input, setInput] = useState<string>(defaultValue ?? options[0]);
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

	return (
		<Input.Root>
			<div ref={divRef}>
				{label && (
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
					className={"cursor-pointer pr-8"}
					onChange={(e) => {
						setInput(e.target.value);
					}}
					onFocus={() => {
						setShowDropDown(true);
					}}
					value={input}
					minLength={minLength}
					invalid={invalid}
					disabled={disabled}
					required={required}
					readOnly
				/>

				<Input.Icon
					className={disabled ? "cursor-default" : ""}
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
						{options.length > 0 ? (
							options.map((value, index) => (
								<span
									key={index}
									data-value={value}
									className="block w-full cursor-pointer select-none truncate 
								border-b border-zinc-200 p-2 transition-all 
								hover:scale-[101%] hover:bg-zinc-200"
									onClick={() => {
										setInput(value);
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
