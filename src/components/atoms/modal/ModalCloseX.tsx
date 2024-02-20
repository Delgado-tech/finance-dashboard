import { useModalContext } from "@/context/ModalContext";
import { X } from "lucide-react";

interface Props {
	id: string;
}

export default function ModalCloseX({ id }: Props) {
	const modalContext = useModalContext();

	return (
		<span className="flex justify-end pb-4 text-zinc-800">
			<X className="cursor-pointer" onClick={() => modalContext.closeId(id)} />
		</span>
	);
}
