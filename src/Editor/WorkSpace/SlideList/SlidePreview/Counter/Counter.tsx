import styles from './Counter.css'

type CounterProps = {
	index: number
}

function Counter({ index }: CounterProps) {
	return <span className={styles.Counter}>{index}</span>
}

export { Counter }
