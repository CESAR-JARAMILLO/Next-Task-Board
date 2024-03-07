import { Box, Paper, Text } from '@mantine/core'
import styles from './BoardColumnTask.module.css'

interface BoardColumnTaskProps {
  task: {
    title: string
    description: string
    status: string
    subtasks: any
  }

}

const BoardColumnTask = ({task}:BoardColumnTaskProps) => {
  return (
    <Paper className={styles.columnTaskCard}>
      <Text className={styles.taskCardTitle}>{task.title}</Text>
      <Text className={styles.taskCardSubtitle}>0 of 3 subtasks</Text>
    </Paper>
  )
}

export default BoardColumnTask