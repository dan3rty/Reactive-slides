import { InputField } from '../../../../common/Components/InputFields/InputField'
import styles from './AnimationBar.css'
import { Button } from '../../../../common/Components/Buttons/Button'
import { Timeline } from './Timeline/Timeline'
import { useAppActions, useAppSelector } from '../../../../redux/hooks'
import { useState } from 'react'

function AnimationBar() {
	const presenter = useAppSelector((state) => state)
	const selection = presenter.selection
	const slides = presenter.presentation.slides
	const selectedObject = slides
		.find((slide) => slide.id === selection.slideId)
		.objects.find((obj) => obj.id == selection.objectId)
	const animation = selectedObject?.animation
	const { createChangeObjectAction, createChangeKeyframeSelectionAction } = useAppActions()
	const [keyframeTimeState, setKeyframeTimeState] = useState(0)
	const durations = selectedObject.animation.stateList.map((state) => {
		return state.keyPercent
	})
	return (
		<div className={styles.animationBar}>
			<div className={styles.bigContainer}>
				<InputField
					label={'X:'}
					type={'number'}
					size={'Large'}
					initialValue={Math.floor(selectedObject?.baseState.x)}
					suffix={'px'}
					onChange={(value) => {
						createChangeObjectAction(selection.slideId, selectedObject.id, {
							baseState: {
								...selectedObject.baseState,
								x: Number(value),
							},
						})
					}}
				/>
				<InputField
					label={'Y:'}
					type={'number'}
					size={'Large'}
					initialValue={Math.floor(selectedObject?.baseState.y)}
					suffix={'px'}
					onChange={(value) => {
						createChangeObjectAction(selection.slideId, selectedObject.id, {
							baseState: {
								...selectedObject.baseState,
								y: Number(value),
							},
						})
					}}
				/>
			</div>
			<div className={styles.mediumContainer}>
				<InputField
					label={'Width:'}
					type={'number'}
					size={'Medium'}
					initialValue={Math.floor(selectedObject?.baseState.width)}
					suffix={'px'}
					onChange={(value) => {
						createChangeObjectAction(selection.slideId, selectedObject.id, {
							baseState: {
								...selectedObject.baseState,
								width: Number(value),
							},
						})
					}}
				/>
				<InputField
					label={'Height:'}
					type={'number'}
					size={'Medium'}
					initialValue={Math.floor(selectedObject?.baseState.height)}
					suffix={'px'}
					onChange={(value) => {
						createChangeObjectAction(selection.slideId, selectedObject.id, {
							baseState: {
								...selectedObject.baseState,
								height: Number(value),
							},
						})
					}}
				/>
			</div>
			<div className={styles.mediumContainer}>
				<div className={styles.horizontalContainer}>
					<InputField
						label={'time:'}
						type={'number'}
						initialValue={0}
						size={'Small'}
						suffix={'sec'}
						onChange={(time) => {
							setKeyframeTimeState(Number(time))
						}}
					/>
					<Button
						text={'add keyframe'}
						style={'dark'}
						size={'large'}
						onClick={() => {
							const keyframeTime =
								(keyframeTimeState / selectedObject.animation.duration) * 100
							if (durations.includes(keyframeTime) || !keyframeTimeState) {
								return
							}
							createChangeObjectAction(selection.slideId, selectedObject.id, {
								animation: {
									...selectedObject.animation,
									duration: Math.max(
										keyframeTimeState,
										selectedObject.animation.duration,
									),
									stateList: [
										...selectedObject.animation.stateList.map((state) => ({
											...state,
											keyPercent:
												((state.keyPercent *
													selectedObject.animation.duration) /
													100 /
													Math.max(
														keyframeTimeState,
														selectedObject.animation.duration,
													)) *
												100,
										})),
										{
											id: Math.random().toString(16).slice(2),
											keyPercent:
												(keyframeTimeState /
													Math.max(
														keyframeTimeState,
														selectedObject.animation.duration,
													)) *
												100,
											state: selectedObject.baseState,
										},
									],
								},
							})
							createChangeKeyframeSelectionAction('')
						}}
					/>
					<Button
						text={'delete keyframe'}
						style={'dark'}
						size={'large'}
						onClick={() => {
							let maxPercent = 0
							selectedObject.animation.stateList
								.filter((state) => state.id !== selection.keyFrameId)
								.map((state) => {
									if (state.keyPercent > maxPercent) {
										maxPercent = state.keyPercent
									}
								})
							createChangeObjectAction(selection.slideId, selectedObject.id, {
								animation: {
									...selectedObject.animation,
									duration:
										(maxPercent * selectedObject.animation.duration) / 100,
									stateList: selectedObject.animation.stateList
										.filter((state) => state.id !== selection.keyFrameId)
										.map((state) => ({
											...state,
											keyPercent: (maxPercent / state.keyPercent) * 100,
										})),
								},
							})
							createChangeKeyframeSelectionAction('')
						}}
					/>
				</div>
				<Timeline animation={animation} chosenState={selection.keyFrameId}></Timeline>
			</div>
			<div className={styles.loopWrapper}>
				<Button
					text={'loop'}
					style={'dark'}
					size={'normal'}
					onClick={() => {
						createChangeObjectAction(selection.slideId, selectedObject.id, {
							animation: {
								...selectedObject.animation,
								looped: true,
							},
						})
					}}
				/>
				<Button
					text={'unloop'}
					style={'dark'}
					size={'normal'}
					onClick={() => {
						createChangeObjectAction(selection.slideId, selectedObject.id, {
							animation: {
								...selectedObject.animation,
								looped: false,
							},
						})
					}}
				/>
			</div>
		</div>
	)
}

export { AnimationBar }
