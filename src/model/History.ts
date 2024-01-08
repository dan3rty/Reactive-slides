type History<T> = {
	addHistoryItem: (item: T) => void
	undo: () => T | null
	redo: () => T | null
}

function createHistory<T>(initHistoryAction: T): History<T> {
	let currentItemIndex = 0
	const historyItems = [initHistoryAction]

	return {
		addHistoryItem: (item: T) => {
			historyItems.length = currentItemIndex + 1
			historyItems.push(item)
			currentItemIndex++
		},
		undo: () => {
			if (currentItemIndex <= 0) {
				return null
			}
			currentItemIndex--
			return historyItems[currentItemIndex]
		},
		redo: () => {
			if (historyItems.length <= currentItemIndex + 1) {
				return null
			}
			currentItemIndex++
			return historyItems[currentItemIndex]
		},
	}
}
export { createHistory }
