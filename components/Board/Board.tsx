import { Suspense } from 'react';
import BoardColumn from '../BoardColumn/BoardColumn';
import { Box } from '@mantine/core';
import styles from './Board.module.css';
import BoardGridSegmentedControll from '../BoardColumnViewControl/BoardColumnViewControl';

interface BoardProps {
  taskTypes: string[] | null;
  boardID: string | null;
  taskID: string | null;
}

const Board = ({ taskTypes, boardID, taskID }: BoardProps) => {
  const defaultTaskTypes = ['Todo', 'Doing', 'Done'];
  const displayedTaskTypes = taskTypes || defaultTaskTypes;

  return (
    <Box className={styles.boardContainer}>
      <Box className={styles.segmentedControllContainer}>
        <Suspense>
          <BoardGridSegmentedControll />
        </Suspense>
      </Box>
      <Box className={styles.boardGrid}>
        {displayedTaskTypes.includes('Todo') && (
          <Box>
            <BoardColumn boardID={boardID} taskID={taskID} taskType="Todo" />
          </Box>
        )}
        {displayedTaskTypes.includes('Doing') && (
          <Box>
            <BoardColumn boardID={boardID} taskID={taskID} taskType="Doing" />
          </Box>
        )}
        {displayedTaskTypes.includes('Done') && (
          <Box>
            <BoardColumn boardID={boardID} taskID={taskID} taskType="Done" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Board;
