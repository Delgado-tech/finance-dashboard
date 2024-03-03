export function arraySum(arr: string[] | number[]): number {
	return arr.length > 0
		? Number(
				arr.reduce(
					(prevValue, currentValue) => Number(prevValue) + Number(currentValue),
				),
			)
		: 0;
}
