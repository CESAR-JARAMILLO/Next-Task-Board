import React from 'react'
import BoardColumn from '../BoardColumn/BoardColumn'
import { Box } from '@mantine/core'
import styles from './Board.module.css'
import BoardGridSegmentedControll from '../BoardColumnViewControl/BoardColumnViewControl'

interface BoardProps {
  taskTypes: any;
}

const Board = ({taskTypes}:BoardProps) => {

  return (
    <Box className={styles.boardContainer}>
      <Box className={styles.segmentedControllContainer}>
        <BoardGridSegmentedControll />
      </Box>
      <Box className={styles.boardGrid}>
        <Box>
          {taskTypes.includes('Todo') && <BoardColumn taskType="Todo" />}
        </Box>
        <Box>
          {taskTypes.includes('Doing') && <BoardColumn taskType="Doing" />}
        </Box>
        <Box>
          {taskTypes.includes('Done') && <BoardColumn taskType="Done" />}
        </Box>
      </Box>
    </Box>
  )
}

export default Board