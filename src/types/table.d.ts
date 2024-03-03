export interface ITable {
	header?: React.ReactNode[];
	rows?: IRows[];
	noResultsMessage?: string;
}

export interface IRows {
	id: string;
	columns?: React.ReactNode[];
}
