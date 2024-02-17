type ObjectEntries = [key: string, value: any];

interface IBinnarySearchResult {
	result: any;
	rounds: number;
}

export default class BinnarySearch {
	static Object(
		keyToFind: string,
		arrayToSearch: ObjectEntries[],
	): IBinnarySearchResult {
		let rounds = 0;
		let result: Object | undefined = undefined;

		while (!result) {
			rounds++;
			const currentIndex = Math.floor(arrayToSearch.length / 2);
			if (currentIndex - 1 < 0) break;

			const compare = keyToFind.localeCompare(arrayToSearch[currentIndex][0]);
			if (compare > 0) {
				arrayToSearch = arrayToSearch.slice(currentIndex, arrayToSearch.length);
			} else if (compare < 0) {
				arrayToSearch = arrayToSearch.slice(0, currentIndex);
			} else {
				result = arrayToSearch[currentIndex][1];
			}
		}

		return { result, rounds };
	}
}
