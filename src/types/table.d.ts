export interface ITable {
	header?: React.ReactNode[];
	rows?: IRows[];
	noResultsMessage?: string;
}

export interface IRows {
	columns?: React.ReactNode[];
}
