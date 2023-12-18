import { useCallback } from 'react'

type OnResizeStartFn = (args: { onDrag: (event: MouseEvent) => void; onDrop: () => void }) => void

function useResizableObject() {
	const registerResizableItem = useCallback(() => {
		const onDragStart: OnResizeStartFn = ({ onDrag, onDrop }) => {
			const onMouseUp = () => {
				onDrop()

				window.removeEventListener('mousemove', onDrag)
				window.removeEventListener('mouseup', onMouseUp)
			}

			window.addEventListener('mousemove', onDrag)
			window.addEventListener('mouseup', onMouseUp)
		}

		return {
			onDragStart,
		}
	}, [])

	return {
		registerResizableItem,
	}
}

export { useResizableObject }
