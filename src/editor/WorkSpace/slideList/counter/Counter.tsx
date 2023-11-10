import styles from './Counter.module.css'

type CounterProps = {
	index: number
}
function Counter(props: CounterProps) {
	return <span className={styles.Counter}>{props.index}</span>
}

export { Counter }
