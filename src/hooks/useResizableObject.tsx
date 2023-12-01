import { RefObject, useCallback } from 'react'

type ResizeItemInfo = {
	objectRef: RefObject<HTMLDivElement>
	cornerRef: RefObject<HTMLDivElement>
}

type InternalResizeItemInfo = ResizeItemInfo & {
	startY: number
	startX: number
}

type OnResizeStartFn = (args: { onDrag: (event: MouseEvent) => void }) => void

function useResizableObject() {
	const registerResizableItem = useCallback((resizeItemInfo: ResizeItemInfo) => {
		const item: InternalResizeItemInfo = {
			...resizeItemInfo,
			startY: 0,
			startX: 0,
		}

		const onDragStart: OnResizeStartFn = ({ onDrag }) => {
			item.startY = item.cornerRef.current!.getBoundingClientRect().top

			const onMouseUp = () => {
				// onDrop(event)

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
