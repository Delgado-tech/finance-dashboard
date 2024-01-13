import { ComponentProps } from "react";

interface Props extends ComponentProps<"figure"> {
	icon: React.ReactNode;
}

export default function ButtonIcon({ icon, className }: Props) {
	return <figure className={className}>{icon}</figure>;
}
