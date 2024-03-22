"use client";

import { clamp } from "@/utils/clamp";
import { Crosshair, Receipt, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../atoms/button";
import SelectInput from "../molecules/SelectInput";

export default function SavingsGoal() {
	const [targetAchivied, setTargetAchivied] = useState<number>(0);
	const [target, setTarget] = useState<number>(12);
	const [progressBar, setProgressBar] = useState<number>(0);

	useEffect(() => {
		setTimeout(() => {
			setProgressBar((targetAchivied / target) * 100);
		}, 200);
	}, []);

	return (
		<div className="max-w-[500px] rounded-lg bg-white p-8 text-zinc-800">
			<div className="grid grid-cols-2 items-center border-b border-zinc-200 pb-4">
				<h3 className="text-xl font-semibold text-zinc-700">Meta de Gastos</h3>
				<SelectInput id={"date"} options={[]} />
			</div>
			<div className="flex justify-between gap-8 pt-4">
				{/* Valores */}
				<div className="flex flex-col gap-8">
					<div className="flex flex-col">
						<span className="flex items-start gap-2 font-poppins text-zinc-500">
							<Receipt />
							<div className="flex flex-col">
								<span>Valor Gastado</span>
								<span className="text-xl font-medium text-zinc-800">
									R$ {targetAchivied}
								</span>
							</div>
						</span>
					</div>

					<div className="flex flex-col">
						<span className="flex items-start gap-2 font-poppins text-zinc-500">
							<Crosshair />
							<div className="flex flex-col">
								<span>Alvo de Gastos</span>
								<span className="text-xl font-medium text-zinc-800">R$ {target}</span>
							</div>
						</span>
					</div>
				</div>

				{/* Velocimetro */}
				<div className="flex flex-col gap-6">
					<div className="relative h-20 w-40">
						{/* Barra de progresso vazia */}
						<div>
							<span className="absolute -bottom-2 left-0 size-4 -rotate-0 rounded-full bg-zinc-200" />
							<span
								className="letf-0 absolute top-0 z-0 size-40 -rotate-45 
                                rounded-full border-[16px] border-zinc-200 border-b-transparent
                                border-l-transparent"
							/>
							<span className="absolute -bottom-2 right-0 size-4 -rotate-0 rounded-full bg-zinc-200" />
						</div>

						{/* Barra de progresso cheia e medidor */}
						<div className="group/bar z-20">
							<div className="clip relative h-20 w-40">
								<span
									className="letf-0 absolute top-0 z-0 size-40 -rotate-[225deg]
                                    rounded-full border-[16px] border-teal-500 border-b-transparent border-l-transparent transition-all
                                    duration-500"
									style={{ rotate: `${clamp(progressBar * 1.8, 0, 180)}deg` }}
								/>
							</div>
							<span
								className="letf-0 absolute top-0 z-0 size-40 -rotate-[225deg]
                                    rounded-full border-[16px] border-transparent border-b-transparent border-l-transparent transition-all
                                    duration-500 before:absolute before:bottom-[6px] before:right-1 before:size-4 before:rounded-full before:bg-teal-500 
                                    before:content-['_']"
								style={{ rotate: `${clamp(progressBar * 1.81, 0, 181)}deg` }}
							/>
							<span className="absolute -bottom-[9px] left-0 size-4 -rotate-0 rounded-full bg-teal-500" />
							<span className="absolute -bottom-4 left-[calc(50%-8px)] size-4 rounded-full bg-teal-500">
								<span
									className="clip-arrow absolute bottom-[8px] left-[calc(50%-20px)] h-[52px] w-10 origin-[bottom_center] 
                                -rotate-90 bg-teal-500 transition-all duration-500"
									style={{ rotate: `${clamp(progressBar * 2, 0, 180)}deg` }}
								/>
							</span>
						</div>

						<div className="relative mt-6 flex select-none justify-center">
							<span className="font-poppins font-medium">R${targetAchivied}</span>
						</div>
					</div>

					<div className="relative mt-8 flex justify-center">
						<span className="font-medium text-zinc-500">Gasto x Alvo</span>
					</div>
				</div>
			</div>
			<span className="flex justify-center px-8 pt-8">
				<Button.Root className="group/btn w-fit border border-teal-500 bg-transparent px-8 hover:border-teal-400 hover:bg-transparent">
					<Button.Content
						text={"Ajustar"}
						className="text-lg font-medium text-teal-500 group-hover/btn:text-teal-400"
					/>
					<Button.Icon
						icon={<SquarePen />}
						className="text-teal-500 group-hover/btn:text-teal-400"
					/>
				</Button.Root>
			</span>
		</div>
	);
}
