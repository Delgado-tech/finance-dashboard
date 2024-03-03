export function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

/**
 * @description Quando o valor informado ultrapassar o limite estabelecido pela váriavel max ele será igual a o valor de min e vice-versa
 * @param value
 * @param min
 * @param max
 */
export function clampClock(value: number, min: number, max: number): number {
	if (value > max) value = min;
	else if (value < min) value = max;

	return value;
}
