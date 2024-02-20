import { ComponentProps, useState } from "react";

interface IDisplay {
	display: string;
	value: string;
}

interface Props extends ComponentProps<"input"> {
	id: string;
	options: IDisplay[];
}

export default function SwitchTextInput({ id, name = id, options }: Props) {
	const [selectedOption, setSelectedOption] = useState<string>(options[0].value);

	return (
		<>
			<input id={id} name={name} type={"hidden"} value={selectedOption} />
			<div className="grid grid-cols-2 rounded-lg  bg-zinc-200 shadow-sm first:[&>span]:rounded-l-lg last:[&>span]:rounded-r-lg">
				{options.map((op, index) => (
					<span
						key={index}
						data-selected={op.value === selectedOption}
						className="cursor-pointer select-none p-4 data-[selected=true]:bg-teal-500 data-[selected=true]:text-white"
						onClick={() => {
							setSelectedOption(op.value);
						}}
					>
						{op.display}
					</span>
				))}
			</div>
		</>
	);
}
