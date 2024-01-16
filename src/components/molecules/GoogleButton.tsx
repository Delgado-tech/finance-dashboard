"use client";

import Image from "next/image";
import { ComponentProps } from "react";
import Button from "../atoms/button";

interface Props extends ComponentProps<"button"> {}

export default function GoogleButton({ className }: Props) {
	return (
		<Button.Root className={className}>
			<Button.Icon
				icon={
					<Image
						src={"/svg/icon-google.svg"}
						alt={"google-icon"}
						width={24}
						height={24}
					/>
				}
			/>
			<Button.Content text="Continuar com Google" />
		</Button.Root>
	);
}
