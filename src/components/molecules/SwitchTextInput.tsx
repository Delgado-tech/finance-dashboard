import { ComponentProps, useState } from "react";

interface IDisplay {
	display: string;
	value: string;
}

interface Props extends ComponentProps<"input"> {
	id: string;
	onSwitch?: (option: string) => void;
	options: IDisplay[];
}

export default function SwitchTextInput({
	id,
	name = id,
	options,
	defaultValue,
	onSwitch = () => {},
	disabled = false,
}: Props) {
	const [selectedOption, setSelectedOption] = useState<string>(
		String(defaultValue || options[0].value),
	);

	return (
		<>
			<input id={id} name={name} type={"hidden"} value={selectedOption} />
			<div className="grid grid-cols-2 rounded-lg bg-zinc-200 shadow-sm first:[&>span]:rounded-l-lg last:[&>span]:rounded-r-lg">
				{options.map((op, index) => (
					<span
						key={index}
						data-disabled={disabled}
						data-selected={op.value === selectedOption}
						className="cursor-pointer select-none p-4 data-[disabled=true]:cursor-default data-[disabled=true]:data-[selected=true]:bg-zinc-500 data-[selected=true]:bg-teal-500 data-[selected=true]:text-white"
						onClick={() => {
							if (!disabled) {
								setSelectedOption(op.value);
								onSwitch(op.value);
							}
						}}
					>
						{op.display}
					</span>
				))}
			</div>
		</>
	);
}
