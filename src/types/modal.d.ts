interface Props extends ComponentProps<"div"> {
	id: string;
	sourceId?: string;
}

export type ModalElement = ({ id, sourceId, className }: Props) => JSX.Element;
