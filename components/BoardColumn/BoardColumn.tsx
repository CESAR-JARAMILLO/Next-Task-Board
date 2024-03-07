import React from 'react'
import BoardColumnTask from '../BoardColumnTask/BoardColumnTask'
import data from '@/data/data.json'
import { Box, Flex, Text } from '@mantine/core'
import styles from './BoardColumn.module.css'

const BoardColumn = () => {
  const tasks = data.boards[0].columns[0].tasks
  return (
    <Box className={styles.boardColumn}>
      <Flex className={styles.columnTaskType}>
        <Box  className={styles.taskTypeCircle}/>
        <Text className={styles.taskTypeText}>{`Todo (4)`}</Text>
      </Flex>
      {tasks.map((task, index) => (
        <BoardColumnTask key={index} task={task}/>
      ))}
    </Box>
  )
}

export default BoardColumn